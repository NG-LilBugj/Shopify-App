const axios = require('axios');

const getSubscriptionUrl = async (ctx, accessToken, shop) => {

    const query = JSON.stringify({
        query: `mutation {
      appSubscriptionCreate(
          name: "Free plan with priority"
          returnUrl: "${process.env.HOST}"
          test: true
          lineItems: [
          {
            plan: {
              appRecurringPricingDetails: {
                  price: { amount: 0.99, currencyCode: USD }
              }
            }
          }
          {
            plan: {
              appRecurringPricingDetails: {
                  price: { amount: 0, currencyCode: USD }
              }
            }
          }
          ]
        ) {
            userErrors {
              field
              message
            }
            confirmationUrl
            appSubscription {
              id
            }
        }
    }`
    });

    const response = await axios.post(`https://${shop}/admin/api/2020-01/graphql.json`, query,{
        headers: {
            "X-Shopify-Access-Token": accessToken,
        },
    });

    const responseJson = await response;
    const confirmationUrl = responseJson.data.appSubscriptionCreate.confirmation_url;
    return ctx.redirect(confirmationUrl)
};

module.exports = getSubscriptionUrl;