const axios = require('axios');

const getSubscriptionUrl = async (ctx, accessToken, shop) => {

    const response = await axios.post(`https://${shop}/admin/api/2020-01/recurring_application_charges.json`, {
        "recurring_application_charge": {
            "name": "TopSale Banners Plan",
            "price": 10.0,
            "return_url": process.env.HOST,
            "trial_days": 7,
        }
    },{
        headers: {
            "X-Shopify-Access-Token": accessToken,
        },
    });

    const responseJson = await response;
    const confirmationUrl = responseJson.data.recurring_application_charge.confirmation_url;
    console.log(confirmationUrl);
    return ctx.redirect(confirmationUrl)
};

module.exports = getSubscriptionUrl;