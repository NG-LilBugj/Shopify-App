const DBAccess = require('./dbAccess');
const BannerConfig = DBAccess.BannerConfig;
const BadgeConfig = DBAccess.BadgeConfig;

const modelDecoder = (ctx) => {
    return new Promise((res, rej) => {
        const config = BannerConfig.find({shop: ctx.cookies.get('shopOrigin')});
        config.exec((err, conf) => {
            if (err) {rej(err)}
            else res(conf)
        })
    })
};
const badgeDecoder = (ctx) => {
    return new Promise((res, rej) => {
        const config = BadgeConfig.find({shop: ctx.cookies.get('shopOrigin')});
        config.exec((err, conf) => {
            if (err) {rej(err)}
            else res(conf)
        })
    })
};
const getter = () => {
    return new Promise((res, rej) => {
        const arr = BannerConfig.find();
        arr.exec((err, conf) => {
            if (err) {rej(err)}
            else res(conf)
        })
    })
};

module.exports.decoder = modelDecoder;
module.exports.badgeDecoder = badgeDecoder;
module.exports.getter = getter;
