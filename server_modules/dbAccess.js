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
    isAllProducts: Boolean,
    isAllCollection: Boolean,
    isRepeatable: Boolean,
    firstText: String,
    secondText: String,
    isLinkActive: Boolean,
    linkText: String,
    href: String
});  // schema for countdown timer

const badgeSchema = new mongoose.Schema({
    id: Number,
    shop: String,
    name: String,
    pickedBadge: Number,
    bannerRenderValue: String,
    products: Array,
    isAllProducts: Boolean
}); // schema for sale banner

const animationSchema = new mongoose.Schema({
    id: Number,
    shop: String,
    name: String,
    pickedAnimation: Number,
    animationRenderValue: String,
    message: String,
    products: Array,
    isAllProducts: Boolean
}); // schema for animation badge

const BannerConfig = mongoose.model('bannerConfig', bannerSchema);
const BadgeConfig = mongoose.model('badgeConfig', badgeSchema);
const AnimationConfig = mongoose.model('animationConfig', animationSchema);
// mongoose model creation

module.exports = {
    BannerConfig,
    BadgeConfig,
    AnimationConfig
}; // module exported

