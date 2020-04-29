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

dotenv.config();

const port = process.env.PORT || 8000;
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

axios.get('https://nahku-b-tahke.myshopify.com/admin/api/2020-04/script_tags.json', {headers: {
    cookie: "new_admin=1; _abv=0; _secure_admin_session_id=00efea6606df73d0c452c7f1ead7548a; new_theme_editor_disabled.sig=c0lGzzh0MFBQ5fCQTfz7yqvtriw; new_theme_editor_disabled=1; _master_udr=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyTXpsbU1UWm1aQzB5TVdOaUxUUXlOVEl0T1dZd1pTMDVaV1F3TkdWa1pEazNNalFHT2daRlJnPT0iLCJleHAiOiIyMDIyLTA0LTE3VDEwOjEwOjE5LjgzN1oiLCJwdXIiOiJjb29raWUuX21hc3Rlcl91ZHIifX0%3D--57bc5c71790e40f7a51583a27a221e5f0ce239a3; koa.sid=C93SEA4vr0mbs-0Mlr2YUdpvis5rlpor; koa.sid.sig=4SAC_N-73E9glZv1FqdOU28L8eo; __ssid=f9bb3c7f-4320-4709-a682-adcc06c21884; _y=5572fde9-0fdb-4201-9a38-2a1ab9a8d812; _shopify_y=5572fde9-0fdb-4201-9a38-2a1ab9a8d812; _shopify_fs=2020-03-04T12%3A23%3A43.307Z; _ab=1; secure_customer_sig=; _abv=0; _ga=GA1.2.2144947374.1584373127; cart_sig=; _orig_referrer=; _landing_page=%2Fadmin%2Fapps%2Fsample-app-359; _ab_session=l0h4cCIEFZGEMrNfGp7NOJy2xMtOSAH0H3XLSIVRKRtfbNH989%2BF9oHz%2FdZwLsWLGj40dEgtMtfe2s0QPtLn22opsh72EJxTbjV9pvp6wyB08Fc1LztTMem08WN8iK1S6r5g22I%3D--MCDUDXYHykQ50LOG--WP3VGQPflpSQFsU2TlYbIg%3D%3D; _s=c5fdacc1-43A3-4D50-5484-8062965B7D89; _shopify_s=c5fdacc1-43A3-4D50-5484-8062965B7D89; _shopify_sa_p=; _shopify_sa_t=2020-04-29T13%3A17%3A12.884Z; __cfduid=d2f852f9827a9b2fa73428637d94f91031588166628"
    }}).then(res=>{console.log(res.data)});

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

