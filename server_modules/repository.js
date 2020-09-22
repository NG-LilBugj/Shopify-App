const DBAccess = require('./dbAccess');
const axios = require('axios');
const getSubscriptionUrl = require('./subscription');
const {registerWebhook} = require('@shopify/koa-shopify-webhooks');
const {ApiVersion} = require('@shopify/koa-shopify-graphql-proxy');
const BannerConfig = DBAccess.BannerConfig;
const BadgeConfig = DBAccess.BadgeConfig;
const ShopCredentials = DBAccess.ShopCredentials;

const modelDecoder = (ctx, Config) => {
    return new Promise((res, rej) => {
        const config = Config.find({shop: ctx.cookies.get('shopOrigin')});
        config.exec((err, conf) => {
            if (err) {rej(err)}
            else res(conf)
        })
    })
}; // special function for erasing data from mongoose config model

const credentialDecoder = async (ctx, Config) => {
    const credentials = await Config.findOne({shopOrigin: window.location.hostname});
    console.log(credentials);
    credentials.exec((err, res) => {
        if (err) {console.log(err)}
        else return res
    })
};

const getter = () => {
    return new Promise((res, rej) => {
        const arr = BannerConfig.find();
        arr.exec((err, conf) => {
            if (err) {rej(err)}
            else res(conf)
        })
    })
}; // special testing function

class AmplitudeFabricator {
    constructor(bundle) {
        this.event_type = bundle.event;
        this.user_id = bundle.userId;
        this.ip = bundle.ip
    }

    event_type = '';
    user_id = 'null_id';
    ip = '127.0.0.1'
}

const authOptions = {
    apiKey: process.env.SHOPIFY_API_KEY,
    secret: process.env.SHOPIFY_API_SECRET_KEY,
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

        let newCredentials = new ShopCredentials({
            shopOrigin: shop,
            accessToken
        });
        newCredentials.save().catch(e => console.log(e));

        // try {
        //     const webHooking = await axios.post(`https://${shop}/admin/api/2020-07/webhooks.json`, {
        //         "webhook": {
        //             "topic": "app/uninstalled",
        //             "address": `${process.env.HOST}webhooks/app/uninstalled`,
        //             "format": "json"
        //         }
        //     }, {
        //         headers: {
        //             "X-Shopify-Access-Token": accessToken,
        //         },
        //     });
        //     console.log('traditional webhooking', webHooking.data);
        // }
        // catch (e) {
        //     console.log(e)
        // }
        const registration = await registerWebhook({
            address: `${process.env.HOST}/webhooks/app/uninstalled`,
            topic: 'APP_UNINSTALLED',
            accessToken,
            shop,
            apiVersion: ApiVersion.January20
        });

        if (registration.success) {
            console.log('Successfully registered uninstall-webhook!');
        } else {
            console.log('Failed to register webhook', registration.result.data.webhookSubscriptionCreate);
        }

        //await getSubscriptionUrl(ctx, accessToken, shop);
        ctx.redirect('/');
    }
};

module.exports = {
    decoder: modelDecoder,
    getter,
    AmplitudeFabricator,
    authOptions,
    credentialDecoder
};
