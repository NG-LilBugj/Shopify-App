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

    try {
        const response = await fetch(`https://${shop}/admin/api/2019-10/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-Shopify-Access-Token": accessToken,
            },
            body: query
        });

        const responseJson = await response.json();
        const confirmationUrl = responseJson.data.appSubscriptionCreate.confirmationUrl;
        console.log(responseJson.data.appSubscriptionCreate);
        return ctx.redirect(confirmationUrl)
    }
    catch (e) {
        console.log(e)
    }
};

module.exports = getSubscriptionUrl;