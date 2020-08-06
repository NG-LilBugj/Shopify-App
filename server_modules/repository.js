const DBAccess = require('./dbAccess');
const BannerConfig = DBAccess.BannerConfig;
const BadgeConfig = DBAccess.BadgeConfig;

const modelDecoder = (ctx, Config) => {
    return new Promise((res, rej) => {
        const config = Config.find({shop: ctx.cookies.get('shopOrigin')});
        config.exec((err, conf) => {
            if (err) {rej(err)}
            else res(conf)
        })
    })
}; // special function for erasing data from mongoose config model

const getter = () => {
    return new Promise((res, rej) => {
        const arr = BannerConfig.find();
        arr.exec((err, conf) => {
            if (err) {rej(err)}
            else res(conf)
        })
    })
}; // special testing function

class AmplitudeFabricator {
    constructor(bundle) {
        this.event_type = bundle.event;
        this.user_id = bundle.userId;
        this.ip = bundle.ip
    }

    event_type = '';
    user_id = 'null_id';
    ip = '127.0.0.1'
}

module.exports.decoder = modelDecoder;
module.exports.getter = getter;
module.exports.AmplitudeFabricator = AmplitudeFabricator;
