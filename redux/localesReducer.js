import {Heading} from "@shopify/polaris";

const SET_LOCALES = 'locales_reducer/SET_LOCALES';

const initState = {
    stringsToDisplay: {
        locale: null
    },
    localesStorage: [
        {
            locale: 'en',
            strings: {
                bannerInfo: {
                    bannerName: "Banner name:",
                    goToConfig: "Go to config",
                },
                bannerVariants: {
                    secondPageMainSign: "Which do you want to increase revenue?",
                    countdownTimerBar: "Countdown timer bar",
                    countdownDescription: "Special countdown timer which can render on product or other pages, signs\n" +
                        "that great offer has begun!",
                    countdownRevenue: "About 20% more revenue",
                    saleBanner: "Sale banners",
                    saleBannerDescription: "Incredible label which will underline the unique of your products.",
                    saleBannerRevenue: "About 25% more revenue",
                    animationBanner: "Discount popups",
                    animationDescription: "Gift animation to your customers!",
                    animationRevenue: "About 15% more revenue",
                    continue: "Continue"
                },
                design: {
                    timerDesign: "Timer design",
                    backgroundColor: "Background color:",
                    bannerHeight: "Banner height:",
                    borderWidth: "Border width:",
                    borderColor: "Border color:",
                    bannerTexts: "Banner texts:",
                    firstText: "First text",
                    pleaseEnterText: "Please enter text",
                    secondText: "Second text",
                    discountLink: "Discount link",
                    title: "Title:",
                    link: "Link:",
                },
                initPage: {
                    mainHeader: "TopSale Countdown Banner",
                    subheader: "Increase sales with urgency, countdown timer, labels and awesome banners",
                    button: "Create Banner"
                },
                preview: {
                    bannerPreview: "Banner preview",
                    days: "Days",
                    hours: "Hours",
                    minutes: "Minutes",
                    seconds: "Seconds"
                },
                primary: {

                }
            }
        },
        ]
};

export const localesReducer = (action, state = initState) => {
    switch (action.type) {
        case SET_LOCALES: return {
            ...state,
            stringsToDisplay: state.localesStorage
                .filter(l => action.locale === l.locale)
        };
        default: return state
    }
};

export const setLocales = (locale) => ({type: SET_LOCALES, locale});