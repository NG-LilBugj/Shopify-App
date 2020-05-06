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
    if(err){
        console.log('Some problem occurred' + err)
    }
    else {
        console.log('Connection established')
    }
});

const next = require('next');
const lusca = require('koa-lusca');
const {default: createShopifyAuth} = require('@shopify/koa-shopify-auth');
const {verifyRequest} = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const axios = require('axios');
const request = require('request-promise');

dotenv.config();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const port = process.env.PORT || 8000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const {default: graphQLProxy} = require('@shopify/koa-shopify-graphql-proxy');
const {ApiVersion} = require('@shopify/koa-shopify-graphql-proxy');
const {SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY} = process.env;

const server = new Koa();
const router = new KoaRouter();

const bannerSchema = new mongoose.Schema({
    name: String,
    startDate: String,
    endDate: {end: String},
    position: String,
    sticky: Boolean,
    backGroundColor: {
        hue: Number,
        saturation: Number,
        brightness: Number,
        alpha: Number
    },
    borderSize: Number,
    borderColor: {
        hue: Number,
        saturation: Number,
        brightness: Number,
        alpha: Number
    }
});
let BannerConfig = mongoose.model('bannerConfig', bannerSchema);

//test
let customConfig = new BannerConfig({
    name: "Test",
    startDate: "111",
    endDate: { end:"Fri Jun 12 2020 00:00:00 GMT-0300" },
    position: "Top",
    sticky: true,
    backGroundColor: {
        hue: 275,
        saturation: 0.83,
        brightness: 1,
        alpha: 1
    },
    borderSize: 0,
    borderColor: {
        hue: 1,
        saturation: 1,
        brightness: 1,
        alpha: 0.1,
    }
});
// customConfig.save()
//     .then(res => console.log(res))
//     .catch(err => console.log(err));
console.log(BannerConfig.findOne({name: "Test"}).name);
//////
const config = [];

router.get('/api/script', async (ctx) => {
    try {
        let res = await axios.get(
            `https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-04/script_tags.json`,
            {
                headers: {
                    "X-Shopify-Access-Token": ctx.cookies.get('accessToken')
                }
            });
        ctx.body = {
            status: 'success',
            config: res.data.script_tags.some(t => t.src === 'https://lil-shopify.herokuapp.com/script.js'),
            script: (!!res.data.script_tags
                .filter(t => t.src === 'https://lil-shopify.herokuapp.com/script.js').length)?res.data.script_tags
                .filter(t => t.src === 'https://lil-shopify.herokuapp.com/script.js')
                .map(t => {return {...t, configData: config.find(e => e.id === t.id)}}) : null
            ,
            message: ctx.cookies.get('shopOrigin')
        }
    } catch (e) {
        console.log(e)
    }
});
router.get('api/config', (ctx) => {
    ctx.body = {
        ...config[0]
    }
});
router.post('/api/script', koaBody(), async (ctx) => {
    try {
        const body = ctx.request.body;
        axios.post(`https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-04/script_tags.json`, {
            "script_tag": {
                "event": "onload",
                "src": "https://lil-shopify.herokuapp.com/script.js",
                "display_scope": "all"
            }
        }, {
            headers: {
                "X-Shopify-Access-Token": ctx.cookies.get('accessToken')
            }
        })
            .then(res => {
                console.log(res);
                config.push({...body, id: res.data.script_tag.id});
            });
        ctx.body = {message: 'Config added'}
    } catch (e) {
        console.log(e)
    }
});
router.delete('/api/script', koaBody(), async (ctx) => {
    try {
        let elem = config.pop();
        axios.delete(`https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-04/script_tags/${elem.id}.json`, {
            headers: {
                "X-Shopify-Access-Token": ctx.cookies.get('accessToken')
            }
        }).then(res => console.log(res));
        ctx.body = 'Timer deleted'
    } catch (e) {
        console.log(e)
    }
});

server.use(router.allowedMethods());
server.use(router.routes());
server.use(cors());

const accessStore = {
    addToken(token) {
        this.accessToken = token
    }
};

app.prepare().then(() => {

    server.use(session({secure: true, sameSite: 'none'}, server));
    server.keys = [SHOPIFY_API_SECRET_KEY];
    server.use(
        createShopifyAuth({
            apiKey: SHOPIFY_API_KEY,
            secret: SHOPIFY_API_SECRET_KEY,
            scopes: ['read_products', 'write_products', 'read_script_tags', 'write_script_tags'],
            afterAuth(ctx) {
                accessStore.addToken(ctx.session.accessToken);
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

