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
              appUsagePricingDetails: {
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

        const response = await fetch(`https://${shop}/admin/api/2020-01/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-Shopify-Access-Token": accessToken,
            },
            body: query
        });

        const responseJson = await response.json();
        console.log(responseJson.data)
        const confirmationUrl = responseJson.data.appSubscriptionCreate.confirmationUrl;
        return ctx.redirect(confirmationUrl)
};

module.exports = getSubscriptionUrl;