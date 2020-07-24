const axios = require('axios');
const rep = require('./repository');
const DBAccess = require('./dbAccess');

const decoder = rep.decoder;

const getEndpoint = (bundle) => async (ctx) => {
    try {
        let res = await axios.get(
            `https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-04/script_tags.json`,
            {
                headers: {
                    "X-Shopify-Access-Token": ctx.cookies.get('accessToken')
                }
            });
        let confData = await decoder(ctx, bundle.Config);
        console.log(confData);
        ctx.body = {
            status: 'success',
            config: res.data.script_tags.some(t => t.src === `https://lil-storage.herokuapp.com/static/${bundle.file}`),
            script: (!!res.data.script_tags
                .filter(t => t.src === `https://lil-storage.herokuapp.com/static/${bundle.file}`).length) ? res.data.script_tags
                .filter(t => t.src === `https://lil-storage.herokuapp.com/static/${bundle.file}`)
                .map(t => {
                    return {
                        ...t,
                        configData: confData.find(e => t.id === e.id)
                    }
                }) : null
            ,
            message: ctx.cookies.get('shopOrigin')
        }
    } catch (e) {
        console.log(e)
    }
};

const postEndpoint = (bundle) => (ctx) => {
    try {
        const body = ctx.request.body;
        axios.post(`https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-04/script_tags.json`, {
            "script_tag": {
                "event": "onload",
                "src": `https://lil-storage.herokuapp.com/static/${bundle.file}`,
                "display_scope": "all"
            }
        }, {
            headers: {
                "X-Shopify-Access-Token": ctx.cookies.get('accessToken')
            }
        })
            .then(res => {
                console.log(res);
                let customConfig = new bundle.Config({
                    ...body,
                    id: res.data.script_tag.id,
                    shop: ctx.cookies.get('shopOrigin'),
                });
                customConfig.save().catch(e => console.log(e))
            });
        ctx.body = {message: 'Config added'}
    } catch (e) {
        console.log(e)
    }
};

const putEndpoint = (bundle) => async (ctx) => {
    try {
        const body = ctx.request.body;
        const customConfig = await bundle.Config.findOneAndUpdate({shop: ctx.cookies.get('shopOrigin')}, body, {new: true});
        console.log(customConfig);
        ctx.body = {
            message: 'config saved',
            customConfig
        }
    }
    catch (e) {
        console.log(e)
    }
};

const deleteEndpoint = (bundle) => async (ctx) => {
    try {
        bundle.Config.findOne({shop: ctx.cookies.get('shopOrigin')}, (err, res) => {
            if (err) console.log(err);
            else {
                bundle.Config.deleteOne(res, (err) => console.log(err));
                axios.delete(`https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-04/script_tags/${res.id}.json`, {
                    headers: {
                        "X-Shopify-Access-Token": ctx.cookies.get('accessToken')
                    }
                }).then(res => console.log(res));
            }
        });
        ctx.body = 'Timer deleted'
    } catch (e) {
        console.log(e)
    }
};

module.exports = {
    getEndpoint,
    postEndpoint,
    putEndpoint,
    deleteEndpoint
};