const axios = require('axios');

const getSubscriptionUrl = async (ctx, accessToken, shop) => {

        const response = axios.post(`https://${shop}/admin/api/2020-07/recurring_application_charges.json`, {
            "name": "Super Duper Plan",
            "price": 0.99,
            "return_url": process.env.HOST,
            "trial_days": 7
            }, {
            headers: {
                "X-Shopify-Access-Token": ctx.cookies.get('accessToken'),
            },
        });
        const responseJson = await response;
        const confirmationUrl = responseJson.data.recurring_application_charge.confirmation_url;
        return ctx.redirect(confirmationUrl)

};

module.exports = getSubscriptionUrl;