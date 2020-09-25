const axios = require('axios');
const DBAccess = require('./dbAccess');
const end = require('./endpoints');
let {BannerConfig, BadgeConfig, AnimationConfig, ShopCredentials} = DBAccess;

const consoleCallback = (err) => {
    if(err) {
        console.log(err)
    }
    else console.log('success mongoose deleting')
};

const uninstallWebhook = async (ctx) => {
        BannerConfig.deleteMany({shop: ctx.state.webhook.domain}, consoleCallback);
        BadgeConfig.deleteMany({shop: ctx.state.webhook.domain}, consoleCallback);
        AnimationConfig.deleteMany({shop: ctx.state.webhook.domain}, consoleCallback);
        ShopCredentials.deleteMany({shop: ctx.state.webhook.domain}, consoleCallback);

        await end.amplitudeUninstallEvent(ctx);
        ctx.body = {web: ctx.state.webhook}

        // axios.get(`https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-01/recurring_application_charges.json`, {
        //     headers: {
        //         "X-Shopify-Access-Token": ctx.cookies.get('accessToken'),
        //     },
        // })
        //     .then(res => {
        //         res.data.recurring_application_charges.forEach(e => {
        //             if (e.return_url === "https://lil-shopify.herokuapp.com/") {
        //                 axios.delete(`https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-01/recurring_application_charges/${e.id}.json`, {
        //                     headers: {
        //                         "X-Shopify-Access-Token": ctx.cookies.get('accessToken'),
        //                     },
        //                 }).catch(e => console.log(e))
        //             }
        //         });
        //         ctx.body = {web: ctx.state.webhook}
        //     })
        //     .catch(e => console.log(e));
};

module.exports = uninstallWebhook;