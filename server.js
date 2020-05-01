require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const cors = require('koa-cors');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const next = require('next');
const lusca = require('koa-lusca');
const {default: createShopifyAuth} = require('@shopify/koa-shopify-auth');
const {verifyRequest} = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const axios = require('axios');
const request = require('request-promise');

dotenv.config();

const port = process.env.PORT || 8000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const {default: graphQLProxy} = require('@shopify/koa-shopify-graphql-proxy');
const {ApiVersion} = require('@shopify/koa-shopify-graphql-proxy');
const {SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY} = process.env;

const server = new Koa();
const router = new KoaRouter();

const config = [];

router.get('/api/script', async (ctx) => {
    axios.get(
        `https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-04/script_tags.json`,
    { headers: {
            "X-Shopify-Access-Token": ctx.cookies.get('accessToken')
        }
        })
        .then(res => {
            ctx.body = {
                status: 'success',
                data: {
                    config: config[0],
                    script: res.data,
                    message: accessStore.accessToken
                }
            }
        })
        .catch(e => {
            console.log(e);
            ctx.body = {
                status: 'failed',
                error: 'Cannot load data from Shopify API',
                error_message: e.headers
            }
        })
});
router.get('api/ping', (ctx) => {
    ctx.body = {
        cookie: ctx.cookies.get('shopOrigin')
    }

});
router.post('/api/script', koaBody(), async (ctx) => {
    try {
        const body = ctx.request.body;
        //storage.includeScript(body);
        config.push(body);
        ctx.body = 'Config added'
    } catch (e) {
        console.log(e)
    }
});
router.delete('/api/script', koaBody(), async (ctx) => {
    try {
        config.pop();
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

    server.use(router.routes());
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

