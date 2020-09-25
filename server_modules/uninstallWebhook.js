const axios = require('axios');
const DBAccess = require('./dbAccess');
const end = require('./endpoints');
let {BannerConfig, BadgeConfig, AnimationConfig} = DBAccess;

const uninstallWebhook = async (ctx) => {
        BannerConfig.deleteMany({shop: ctx.state.webhook.domain}, (err) => {
            console.log(err)
        });
        BadgeConfig.deleteMany({shop: ctx.state.webhook.domain}, (err) => {
            console.log(err)
        });
        AnimationConfig.find({shop: ctx.state.webhook.domain}, (err) => {
            console.log(err)
        });

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