const SET_LOCALES = 'locales_reducer/SET_LOCALES';

const initState = {
    stringsToDisplay: {
        locale: 'en',
        strings: {
            bannerInfo: {
                bannerName: "Banner name:",
                goToConfig: "Go to config",
            },
            bannerVariants: {
                secondPageMainSign: "Which banner do you want to increase revenue?",
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
                bannerName: "Banner name:",
                enterName: "Enter name...",
                pleaseEnterName: 'Please enter name',
                startDate: "Start date",
                endDate: "End date",
                timerDisplay: "Timer display",
                banner: "Banner",
                widget: "Widget",
                timerPosition: "Timer position at the page",
                top: "Top",
                displaysTimerTop: "Displays timer at the top of the store.",
                bottom: "Bottom",
                displaysTimerBottom: "Displays timer at the bottom of the store.",
                displaySticky: "Display sticky",
                pagesShown: "Pages where timer is shown",
                all: "All",
                displayAtAll: "Displays timer at all pages.",
                collections: "Collections",
                displayAtCollections: "Displays timer at certain collection pages.",
                browseCollections: "Browse collections",
                pickAllCollections: "Pick All Collections",
                products: "Products",
                displayAtProducts: "Displays timer at certain product pages.",
                browseProducts: "Browse products",
                cancel: "Cancel",
                pickAllProducts: "Pick All Products",
                widgetDescription: "Widget description",
                widgetDescriptionText: "Compact timer, available on product pages only. Renders beneath product title",
                widgetPlacement: "Widget placement",
                aboveTitle: "Above title",
                belowTitle: "Below title",
                abovePrice: "Above price",
                belowPrice: "Below price",
                aboveBuyButton: "Above buy button",
                belowBuyButton: "Below buy button",
                productPagesWithTimer: "Product pages with timer",
                utils: "Utils",
                repeat: "Repeat timer when it ends"
            },
            existing_config: {
                existingCountdownTimer: "Existing Countdown Timer:",
                existingBadgeBanner: "Existing Badge Banner:",
                existingAnimationPopup: "Existing Animation Popup:",
                bannerName: "Banner name:",
                actions: "Actions:",
                timer: "Timer"
            },
            animations: {
                customize: "Customize your special popup!",
                save: "Save",
                bannerName: "Popup name:",
                enterName: "Enter name...",
                pleaseEnterName: 'Please enter name',
                pickAnimation: "Pick animation",
                messageText: "Your message text:",
                enterText: "Enter text...",
                pleaseEnterText: "Please enter text",
                productPagesWithPopup: "Product pages with popup:",
                browseProducts: "Browse products",
                cancel: "Cancel",
                pickAllProducts: "Pick All Products",
            },
            badges: {
                customize: "Customize your special badge banner!",
                save: "Save",
                bannerName: "Banner name:",
                enterName: "Enter name...",
                pleaseEnterName: 'Please enter name',
                pickCategory: "Pick category",
                category: "Category:",
                pickBadge: "Pick badge",
                bannerPlacement: "Banner placement",
                productPagesWithBanner: "Product pages with banner:",
                browseProducts: "Browse products",
                cancel: "Cancel",
                pickAllProducts: "Pick All Products",
                aboveTitle: "Above title",
                belowTitle: "Below title",
                abovePrice: "Above price",
                belowPrice: "Below price",
                aboveBuyButton: "Above buy button",
                belowBuyButton: "Below buy button",
            },
            countdown: {
                customize: "Customize your countdown timer!",
                save: "Save"
            },
            success: {
                mainHeading: "Banner added successful!",
                button: "Go to main"
            }
        }
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
                    secondPageMainSign: "Which banner do you want to increase revenue?",
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
                    bannerName: "Banner name:",
                    enterName: "Enter name...",
                    pleaseEnterName: 'Please enter name',
                    startDate: "Start date",
                    endDate: "End date",
                    timerDisplay: "Timer display",
                    banner: "Banner",
                    widget: "Widget",
                    timerPosition: "Timer position at the page",
                    top: "Top",
                    displaysTimerTop: "Displays timer at the top of the store.",
                    bottom: "Bottom",
                    displaysTimerBottom: "Displays timer at the bottom of the store.",
                    displaySticky: "Display sticky",
                    pagesShown: "Pages where timer is shown",
                    all: "All",
                    displayAtAll: "Displays timer at all pages.",
                    collections: "Collections",
                    displayAtCollections: "Displays timer at certain collection pages.",
                    browseCollections: "Browse collections",
                    pickAllCollections: "Pick All Collections",
                    products: "Products",
                    displayAtProducts: "Displays timer at certain product pages.",
                    browseProducts: "Browse products",
                    cancel: "Cancel",
                    pickAllProducts: "Pick All Products",
                    widgetDescription: "Widget description",
                    widgetDescriptionText: "Compact timer, available on product pages only. Renders beneath product title",
                    widgetPlacement: "Widget placement",
                    aboveTitle: "Above title",
                    belowTitle: "Below title",
                    abovePrice: "Above price",
                    belowPrice: "Below price",
                    aboveBuyButton: "Above buy button",
                    belowBuyButton: "Below buy button",
                    productPagesWithTimer: "Product pages with timer",
                    utils: "Utils",
                    repeat: "Repeat timer when it ends"
                },
                existing_config: {
                    existingCountdownTimer: "Existing Countdown Timer:",
                    existingBadgeBanner: "Existing Badge Banner:",
                    existingAnimationPopup: "Existing Animation Popup:",
                    bannerName: "Banner name:",
                    actions: "Actions:",
                    timer: "Timer"
                },
                animations: {
                    customize: "Customize your special popup!",
                    save: "Save",
                    bannerName: "Popup name:",
                    enterName: "Enter name...",
                    pleaseEnterName: 'Please enter name',
                    pickAnimation: "Pick animation",
                    messageText: "Your message text:",
                    enterText: "Enter text...",
                    pleaseEnterText: "Please enter text",
                    productPagesWithPopup: "Product pages with popup:",
                    browseProducts: "Browse products",
                    cancel: "Cancel",
                    pickAllProducts: "Pick All Products",
                },
                badges: {
                    customize: "Customize your special badge banner!",
                    save: "Save",
                    bannerName: "Banner name:",
                    enterName: "Enter name...",
                    pleaseEnterName: 'Please enter name',
                    pickCategory: "Pick category",
                    category: "Category:",
                    pickBadge: "Pick badge",
                    bannerPlacement: "Banner placement",
                    productPagesWithBanner: "Product pages with banner:",
                    browseProducts: "Browse products",
                    cancel: "Cancel",
                    pickAllProducts: "Pick All Products",
                    aboveTitle: "Above title",
                    belowTitle: "Below title",
                    abovePrice: "Above price",
                    belowPrice: "Below price",
                    aboveBuyButton: "Above buy button",
                    belowBuyButton: "Below buy button",
                },
                countdown: {
                    customize: "Customize your countdown timer!",
                    save: "Save"
                },
                success: {
                    mainHeading: "Banner added successful!",
                    button: "Go to main"
                }
            }
        },
        ]
};

export const localesReducer = (state = initState, action) => {
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