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
            }); // HTTP Get request to Shopify ScriptTag API
        let confData = await decoder(ctx, bundle.Config); //Request to mongoose model (in repository file)
        console.log(confData);
        ctx.body = { //response to front with data about script tags and special config
            status: 'success',
            config: res.data.script_tags.some(t => t.src === `https://lil-storage.herokuapp.com/static/${bundle.file}`),
            script: (!!res.data.script_tags
                .filter(t => t.src === `https://lil-storage.herokuapp.com/static/${bundle.file}`).length) ? res.data.script_tags
                .filter(t => t.src === `https://lil-storage.herokuapp.com/static/${bundle.file}`)
                //analysing script tags for matches with our scripts
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
        const body = ctx.request.body; //parsing request from front
        axios.post(`https://${ctx.cookies.get('shopOrigin')}/admin/api/2020-04/script_tags.json`, {
            "script_tag": {
                "event": "onload",
                "src": `https://lil-storage.herokuapp.com/static/${bundle.file}`,
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

module.exports = {
    getEndpoint,
    postEndpoint,
    putEndpoint,
    deleteEndpoint
}; // module exporting