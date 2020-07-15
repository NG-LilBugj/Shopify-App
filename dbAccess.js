const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    id: Number,
    shop: String,
    name: String,
    startDate: {start: String},
    endDate: {end: String},
    isWidget: Boolean,
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
const BannerConfig = mongoose.model('bannerConfig', bannerSchema);

module.exports.BannerConfig = BannerConfig;