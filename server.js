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

const next = require('next');
const {default: createShopifyAuth} = require('@shopify/koa-shopify-auth');
const {verifyRequest} = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const axios = require('axios');
const DBAccess = require('./dbAccess');
const rep = require('./repository');

dotenv.config();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const port = process.env.PORT || 8000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const {default: graphQLProxy} = require('@shopify/koa-shopify-graphql-proxy');
const {ApiVersion} = require('@shopify/koa-shopify-graphql-proxy');
const {receiveWebhook, registerWebhook} = require('@shopify/koa-shopify-webhooks');
const {SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, HOST} = process.env;

const server = new Koa();
const router = new KoaRouter();

let BannerConfig = DBAccess.BannerConfig;

const modelDecoder = rep.decoder;
const getter = rep.getter;

const testFetch = async () => {
    return await getter();
};

console.log(testFetch());


router.get('/api/script', async (ctx) => {
    try {
        let res = await axios.get(
            `https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-04/script_tags.json`,
            {
                headers: {
                    "X-Shopify-Access-Token": ctx.cookies.get('accessToken')
                }
            });
        let confData = await modelDecoder(ctx);
        console.log(confData);
        ctx.body = {
            status: 'success',
            config: res.data.script_tags.some(t => t.src === 'https://lil-shopify.herokuapp.com/script.js'),
            script: (!!res.data.script_tags
                .filter(t => t.src === 'https://lil-storage.herokuapp.com/static/script.js').length) ? res.data.script_tags
                .filter(t => t.src === 'https://lil-storage.herokuapp.com/static/script.js')
                .map(t => {
                    return {
                        ...t,
                        configData: confData.find(e => t.id === e.id)
                    }
                }) : null
            ,
            message: ctx.cookies.get('shopOrigin')
        }
    } catch (e) {
        console.log(e)
    }
});
router.post('/api/script', koaBody(), async (ctx) => {
    try {
        const body = ctx.request.body;
        axios.post(`https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-04/script_tags.json`, {
            "script_tag": {
                "event": "onload",
                "src": "https://lil-storage.herokuapp.com/static/script.js",
                "display_scope": body.display
            }
        }, {
            headers: {
                "X-Shopify-Access-Token": ctx.cookies.get('accessToken')
            }
        })
            .then(res => {
                console.log(res);
                let customConfig = new BannerConfig({
                    ...body,
                    id: res.data.script_tag.id,
                    shop: ctx.cookies.get('shopOrigin'),
                });
                customConfig.save().catch(e => console.log(e))
            });
        ctx.body = {message: 'Config added'}
    } catch (e) {
        console.log(e)
    }
});
router.delete('/api/script', koaBody(), async (ctx) => {
    try {
        BannerConfig.findOne({shop: ctx.cookies.get('shopOrigin')}, (err, res) => {
            if (err) console.log(err);
            else {
                BannerConfig.deleteOne(res, (err) => console.log(err));
                axios.delete(`https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-04/script_tags/${res.id}.json`, {
                    headers: {
                        "X-Shopify-Access-Token": ctx.cookies.get('accessToken')
                    }
                }).then(res => console.log(res));
            }
        });
        ctx.body = 'Timer deleted'
    } catch (e) {
        console.log(e)
    }
});

server.use(router.allowedMethods());
server.use(router.routes());
server.use(cors());

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

                ctx.redirect('/');
            }
        })
    );

    const webhook = receiveWebhook({secret: SHOPIFY_API_SECRET_KEY});

    router.post('webhooks/customers/redact', webhook, (ctx) => {
        console.log('received webhook:', ctx.state.webhook)
    });

    router.post('webhooks/shop/redact', webhook, (ctx) => {
        console.log('received webhook:', ctx.state.webhook)
    });

    router.post('webhooks/customers/data_request', webhook, (ctx) => {
        console.log('received webhook:', ctx.state.webhook)
    });

    server.use(graphQLProxy({version: ApiVersion.January20}));
    server.use(verifyRequest());
    server.use(async (ctx) => {
       await handle(ctx.req, ctx.res);
       ctx.respond = false;
       ctx.res.statusCode = 200;
    });


    server.listen(port, () => {
        console.log(`App is ready on port ${port}`)
    });
});

