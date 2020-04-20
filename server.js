require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const next = require('next');
const lusca = require('koa-lusca');
const {default: createShopifyAuth} = require('@shopify/koa-shopify-auth');
const {verifyRequest} = require('@shopify/koa-shopify-auth');
const session = require('koa-session');

const axios = require('axios');

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const {ApiVersion} = require('@shopify/koa-shopify-graphql-proxy');
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY} = process.env;

const server = new Koa();
const router = new KoaRouter();

const local = [];

router.get('/api/scripts', async (ctx) => {
    try {
        ctx.body = {
            status: 'success',
            data: {
                ...local[0]
            }
        }
    }
    catch (e) {
        console.log(e)
    }
});
router.post('/api/scripts', koaBody(), async (ctx) => {
    try {
        const body = ctx.request.body;
        //storage.includeScript(body);
        local.push(body);
        ctx.body = 'Config added'
    }
    catch (e) {
        console.log(e)
    }
});
router.delete('/api/scripts', koaBody(), async (ctx) => {
    try{
        local.pop();
        ctx.body = 'Timer deleted'
    }
    catch (e) {
        console.log(e)
    }
});

server.use(router.allowedMethods());
server.use(router.routes());

app.prepare().then(() => {

    server.use(session({secure: true, sameSite: 'none'}, server));
    server.keys = [SHOPIFY_API_SECRET_KEY];
    server.use(
        createShopifyAuth({
            apiKey: SHOPIFY_API_KEY,
            secret: SHOPIFY_API_SECRET_KEY,
            scopes: ['read_products','write_products','read_script_tags','write_script_tags'],
            afterAuth(ctx){
                const {shop, accessToken} = ctx.session;
                ctx.cookies.set('shopOrigin', shop, {
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

