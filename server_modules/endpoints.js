const axios = require('axios');
const rep = require('./repository');
const DBAccess = require('./dbAccess');

const Amplitude = require('amplitude');
const amplitude = new Amplitude(process.env.AMPLITUDE_KEY);

const decoder = rep.decoder;
const Fabricator = rep.AmplitudeFabricator;

const getEndpoint = (bundle) => async (ctx) => {
    try {
        let res = await axios.get(
            `https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-04/script_tags.json`,
            {
                headers: {
                    "X-Shopify-Access-Token": ctx.cookies.get('accessToken')
                }
            }); // HTTP Get request to Shopify ScriptTag API
        let confData = await decoder(ctx, bundle.Config); //Request to mongoose model (in repository file)
        ctx.body = { //response to front with data about script tags and special config
            status: 'success',
            config: res.data.script_tags.some(t => (t.src === `https://lil-storage.herokuapp.com/static/${bundle.file}`) ||
                (t.src === `https://lil-proxy.herokuapp.com/static/${bundle.file}`)),
            script: (!!res.data.script_tags
                .filter(t => ((t.src === `https://lil-storage.herokuapp.com/static/${bundle.file}`) ||
                    (t.src === `https://lil-proxy.herokuapp.com/static/${bundle.file}`)).length)) ? res.data.script_tags
                .filter(t => ((t.src === `https://lil-storage.herokuapp.com/static/${bundle.file}`) ||
                    (t.src === `https://lil-proxy.herokuapp.com/static/${bundle.file}`)))
                //analysing script tags for matches with our scripts
                .map(t => {
                    return {
                        ...t,
                        configData: confData.find(e => t.id === e.id)
                    }
                }) : []
            ,
            message: ctx.cookies.get('shopOrigin')
        }
    } catch (e) {
        console.log(e)
    }
};

const postEndpoint = (bundle) => (ctx) => {
    try {
        const body = ctx.request.body; //parsing request from front
        axios.post(`https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-04/script_tags.json`, {
            "script_tag": {
                "event": "onload",
                "src": `https://lil-proxy.herokuapp.com/static/${bundle.file}`,
                "display_scope": "all"
            } // HTTP Post request to Shopify ScriptTag API
        }, {
            headers: {
                "X-Shopify-Access-Token": ctx.cookies.get('accessToken')  //enabling headers
            }
        })
            .then(res => {
                console.log(res);
                let customConfig = new bundle.Config({
                    ...body,
                    id: res.data.script_tag.id,
                    shop: ctx.cookies.get('shopOrigin'),
                });
                customConfig.save().catch(e => console.log(e))  //saving config to MongoDB
            });
        ctx.body = {message: 'Config added'}
    } catch (e) {
        console.log(e)
    }
};

const putEndpoint = (bundle) => async (ctx) => {
    try {
        const body = ctx.request.body;  //parsing request from front
        const customConfig = await bundle.Config.findOneAndUpdate({shop: ctx.cookies.get('shopOrigin'), id: body.id}, body, {new: true});
        // editing document with config in MongoDB
        console.log(customConfig);
        ctx.body = {
            message: 'config saved',
            customConfig
        } // response to front
    }
    catch (e) {
        console.log(e)
    }
};

const deleteEndpoint = (bundle) => async (ctx) => {
    console.log({...bundle, query: ctx.query.id});
    try {
        const id = ctx.query.id;
        bundle.Config.findOne({shop: ctx.cookies.get('shopOrigin'), id}, (err, res) => { // searching for a matching document
            if (err) console.log(err);
            else {
                bundle.Config.deleteOne(res, (err) => console.log(err)); // deleting document
                axios.delete(`https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-04/script_tags/${res.id}.json`, {
                    headers: {
                        "X-Shopify-Access-Token": ctx.cookies.get('accessToken')
                    }
                }).then(res => console.log(res)); // HTTP Delete request to Shopify ScriptTag API
            }
        });
        ctx.body = 'Timer deleted' // response to front
    } catch (e) {
        console.log(e)
    }
};


const billingCheck = async (ctx) => {
    try {
        let res = await axios.get(`https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-01/recurring_application_charges.json`, {
            headers: {
                "X-Shopify-Access-Token": ctx.cookies.get('accessToken'),
            },
        });
        if (res.data.recurring_application_charges
            .find(e => e.return_url === "https://lil-shopify.herokuapp.com/").status === "declined") {
            ctx.body = {onPlan: false, plans: res.data.recurring_application_charges};
        }
        else ctx.body = {onPlan: true, plans: res.data.recurring_application_charges};
    }
    catch (e) {
        ctx.body = {error: e}
    }
};

const amplitudeEvent = (bundle) => async (ctx) => {
    try {
        let ampRes = await amplitude.track(new Fabricator({
            ...bundle,
            userId: ctx.cookies.get('shopOrigin'),
            ip: ctx.ip
        }));
        ctx.body = {amplitude: {...ampRes, ...bundle, fab: new Fabricator({
                    ...bundle,
                    userId: ctx.cookies.get('shopOrigin'),
                    ip: ctx.ip
                })}}
    } catch (e) {
        console.log(e)
    }
};
const amplitudeUninstallEvent = async (ctx) => {
    try {
        let ampRes = await amplitude.track(new Fabricator({
            event: "app_uninstalled",
            userId: ctx.cookies.get('shopOrigin'),
            ip: ctx.ip
        }));
        ctx.body = {amplitude: {...ampRes, fab: new Fabricator({
                    userId: ctx.cookies.get('shopOrigin'),
                    ip: ctx.ip
                })}}
    } catch (e) {
        console.log(e)
    }
} ;

// axios.get(`https://${ctx.get.shopOrigin}/admin/api/2020-07/webhooks/count.json?topic=app/uninstall`)
//     .then(res => {
//         console.log(res.data);
//         if (res.data.count === 0) {
//             axios.post(`https://${ctx.get.shopOrigin}/admin/api/2020-07/webhooks/count.json?topic=app/uninstall`, {
//                 "webhook": {
//                     "topic": "app/uninstall",
//                     "address": `${HOST}/webhooks/app/uninstall`,
//                     "format": "json"
//                 }
//             }).then(res => {ctx.body = res.data})
//                 .catch(e => {ctx.body = {error: e}})
//         }
//         else ctx.body = 'webhook exists'
//     })
//     .catch(e => {
//         ctx.body = {errorGet: e}
//     })

module.exports = {
    getEndpoint,
    postEndpoint,
    putEndpoint,
    deleteEndpoint,
    billingCheck,
    amplitudeEvent,
    amplitudeUninstallEvent
}; // module exporting