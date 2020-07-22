const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    id: Number,
    shop: String,
    name: String,
    startDate: {start: String},
    endDate: {end: String},
    isWidget: Boolean,
    widgetRenderValue: String,
    position: String,
    display: String,
    sticky: Boolean,
    backGroundColor: {
        hue: Number,
        saturation: Number,
        brightness: Number,
        alpha: Number
    },
    bannerHeight: Number,
    borderSize: Number,
    borderColor: {
        hue: Number,
        saturation: Number,
        brightness: Number,
        alpha: Number
    },
    products: Array,
    collections: Array,
    isRepeatable: Boolean,
    firstText: String,
    secondText: String,
    isLinkActive: Boolean,
    linkText: String,
    href: String
});

const badgeSchema = new mongoose.Schema({
    id: Number,
    shop: String,
    name: String,
    pickedBadge: Number,
    bannerRenderValue: String
});

const BannerConfig = mongoose.model('bannerConfig', bannerSchema);
const BadgeConfig = mongoose.model('badgeConfig', badgeSchema);

module.exports.BannerConfig = BannerConfig;
module.exports.BadgeConfig = BadgeConfig;
