require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const cors = require('koa-cors');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    server: {
        socketOptions: {keepAlive: 100000}
    }
}, (err) => {
    if (err) {
        console.log('Some problem occurred' + err)
    } else {
        console.log('Connection established')
    }
});
// mongoose client access to DB

const next = require('next');

const {default: createShopifyAuth} = require('@shopify/koa-shopify-auth');
const {verifyRequest} = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const axios = require('axios');
const DBAccess = require('./server_modules/dbAccess');
const rep = require('./server_modules/repository');
const end = require('./server_modules/endpoints');
const getSubscriptionUrl = require('./server_modules/subscription');

dotenv.config();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// DB connection

const port = process.env.PORT || 8000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
//app deployment

const {default: graphQLProxy} = require('@shopify/koa-shopify-graphql-proxy');
const {ApiVersion} = require('@shopify/koa-shopify-graphql-proxy');
const {receiveWebhook, registerWebhook} = require('@shopify/koa-shopify-webhooks');
const {SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, HOST} = process.env;
//Shopify connections

const server = new Koa();
const router = new KoaRouter();

let {BannerConfig, BadgeConfig, AnimationConfig} = DBAccess;
const {getEndpoint, postEndpoint, putEndpoint, deleteEndpoint, amplitudeEvent} = end;
//server modules

router.get('/api/script', getEndpoint({
    Config: BannerConfig,
    file: 'script.js'
}));
router.get('/api/badge', getEndpoint({
    Config: BadgeConfig,
    file: 'badge.js'
}));
router.get('/api/animation', getEndpoint({
    Config: AnimationConfig,
    file: 'animation.js'
}));
router.post('/api/script', koaBody(), postEndpoint({
    Config: BannerConfig,
    file: 'script.js'
}));
router.post('/api/badge', koaBody(), postEndpoint({
    Config: BadgeConfig,
    file: 'badge.js'
}));
router.post('/api/animation', koaBody(), postEndpoint({
    Config: AnimationConfig,
    file: 'animation.js'
}));
router.put('/api/script', koaBody(), putEndpoint({
    Config: BannerConfig
}));
router.put('/api/badge', koaBody(), putEndpoint({
    Config: BadgeConfig
}));
router.put('/api/animation', koaBody(), putEndpoint({
    Config: AnimationConfig,
}));
router.delete('/api/script', koaBody(), deleteEndpoint({
    Config: BannerConfig
}));
router.delete('/api/badge', koaBody(), deleteEndpoint({
    Config: BadgeConfig
}));
router.delete('/api/animation', koaBody(), deleteEndpoint({
    Config: AnimationConfig,
}));
//// server routing

router.get('/amplitude/intro', amplitudeEvent({
    event: 'intro_screen',
}));
router.get('/amplitude/main', amplitudeEvent({
    event: 'main_screen',
}));
router.get('/amplitude/countdown/in', amplitudeEvent({
    event: 'countdown_timer_page',
}));
router.get('/amplitude/banner/in', amplitudeEvent({
    event: 'countdown_banner_page',
}));
router.get('/amplitude/popup/in', amplitudeEvent({
    event: 'countdown_timer_page',
}));
router.get('/amplitude/countdown/created', amplitudeEvent({
    event: 'countdown_timer_created',
}));
router.get('/amplitude/banner/created', amplitudeEvent({
    event: 'sale_banner_created',
}));
router.get('/amplitude/popup/created', amplitudeEvent({
    event: 'popup_animation_created',
}));
// amplitude endpoints

server.use(router.allowedMethods());
server.use(router.routes());
server.use(cors());
// server route tools

router.get('/billing/check', async (ctx) => {
    let res = await axios.get(`https://${ctx.cookies.get('shopOrigin')}/admin/api/2019-10/graphql.json`);
    if (res.data) {
        //await getSubscriptionUrl(ctx, ctx.cookies.get('accessToken'), ctx.cookies.get('shopOrigin'))
    }
    ctx.body = {body: res.data}
});  // endpoint for billing check

app.prepare().then(() => {

    server.use(session({secure: true, sameSite: 'none'}, server));
    server.keys = [SHOPIFY_API_SECRET_KEY];
    server.use(
        createShopifyAuth({
            apiKey: SHOPIFY_API_KEY,
            secret: SHOPIFY_API_SECRET_KEY,
            scopes: ['read_script_tags', 'write_script_tags'],
            async afterAuth(ctx) {
                const {shop, accessToken} = ctx.session;
                ctx.cookies.set('shopOrigin', shop, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'none'
                });
                ctx.cookies.set('accessToken', accessToken, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'none'
                });

                const registration = await registerWebhook({
                    address: `${HOST}/webhooks/app/uninstalled`,
                    topic: 'APP_UNINSTALLED',
                    accessToken,
                    shop,
                    apiVersion: ApiVersion.January20
                });

                if (registration.success) {
                    console.log('Successfully registered webhook!');
                } else {
                    console.log('Failed to register webhook', registration.result);
                }

                //await getSubscriptionUrl(ctx, accessToken, shop);
                ctx.redirect('/');
            }
        })
    );
    // shopify app connection/registration

    const webhook = receiveWebhook({secret: SHOPIFY_API_SECRET_KEY});

    router.post('webhooks/customers/redact', webhook, (ctx) => {
        console.log('received webhook:', ctx.state.webhook);
    });

    router.post('webhooks/shop/redact', webhook, (ctx) => {
        console.log('received webhook:', ctx.state.webhook);
    });

    router.post('webhooks/customers/data_request', webhook, (ctx) => {
        console.log('received webhook:', ctx.state.webhook);
    });

    router.post('/webhooks/app/unistalled', webhook, (ctx) => {
        console.log(ctx.state.webhook);
        BannerConfig.find({shop: ctx.cookies.get('shopOrigin')}, (err, res) => {
            if (err) {
                console.log(err)
            }
            else {
                BannerConfig.delete(res, err => console.log(err))
            }
        });
        BadgeConfig.find({shop: ctx.cookies.get('shopOrigin')}, (err, res) => {
            if (err) {
                console.log(err)
            }
            else {
                BadgeConfig.delete(res, err => console.log(err))
            }
        });
        AnimationConfig.find({shop: ctx.cookies.get('shopOrigin')}, (err, res) => {
            if (err) {
                console.log(err)
            }
            else {
                AnimationConfig.delete(res, err => console.log(err))
            }
        });
        ctx.body = {web: ctx.state.webhook}
    });
    //idling webhooks

    server.use(graphQLProxy({version: ApiVersion.January20}));
    server.use(verifyRequest());
    server.use(async (ctx) => {
       await handle(ctx.req, ctx.res);
       ctx.respond = false;
       ctx.res.statusCode = 200;
    });
    // shopify API connection

    server.listen(port, () => {
        console.log(`App is ready on port ${port}`)
    });
    //server deployment
});

