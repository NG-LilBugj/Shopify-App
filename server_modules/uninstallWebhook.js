const axios = require('axios');
const DBAccess = require('./dbAccess');
const end = require('./endpoints');
let {BannerConfig, BadgeConfig, AnimationConfig} = DBAccess;

const uninstallWebhook = (ctx) => {
        console.log('webhook fetched!:', ctx.state.webhook);
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

        end.amplitudeUninstallEvent(ctx)
            .catch(e => console.log(e));

        axios.get(`https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-01/recurring_application_charges.json`, {
            headers: {
                "X-Shopify-Access-Token": ctx.cookies.get('accessToken'),
            },
        })
            .then(res => {
                res.data.recurring_application_charges.forEach(e => {
                    if (e.return_url === "https://lil-shopify.herokuapp.com/") {
                        axios.delete(`https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-01/recurring_application_charges/${e.id}.json`, {
                            headers: {
                                "X-Shopify-Access-Token": ctx.cookies.get('accessToken'),
                            },
                        }).catch(e => console.log(e))
                    }
                })
            })
            .catch(e => console.log(e));

        ctx.body = {web: ctx.state.webhook}
};

module.exports = uninstallWebhook;