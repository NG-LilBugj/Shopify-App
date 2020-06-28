const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    id: Number,
    shop: String,
    name: String,
    startDate: {start: String},
    endDate: {end: String},
    position: String,
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
    isRepeatable: Boolean,
    firstText: String,
    secondText: String,
});
const BannerConfig = mongoose.model('bannerConfig', bannerSchema);

module.exports.BannerConfig = BannerConfig;