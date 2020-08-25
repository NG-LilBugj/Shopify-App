const fs = require('fs');
const axios = require('axios');

fs.readFile("./translateStorage/ru_locale.json", "utf-8", (error, data) => {
    if (error) {
        console.log(error)
    }
    else {
        //console.log(JSON.parse(data).strings);

        let localization = "ch";

        let _continue = JSON.parse(data).strings.bannerInfo.continue;
        let _delete = JSON.parse(data).strings.existing_config.delete;
        let homeButton = JSON.parse(data).strings.success.button;
        let mainScreenSign = JSON.parse(data).strings.mainScreen.secondPageMainSign;
        let {bannerName, goToConfig} = JSON.parse(data).strings.bannerInfo;
        let {
            secondPageMainSign,
            countdownTimerBar,
            countdownDescription,
            countdownRevenue,
            saleBanner,
            saleBannerDescription,
            saleBannerRevenue,
            animationBanner,
            animationDescription,
            animationRevenue
        } = JSON.parse(data).strings.bannerVariants;
        let {
            timerDesign,
            backgroundColor,
            bannerHeight,
            borderWidth,
            borderColor,
            bannerTexts,
            firstText,
            pleaseEnterText,
            secondText,
            discountLink,
            title,
            link,
        } = JSON.parse(data).strings.design;
        let {
            mainHeader,
            subheader,
            button
        } = JSON.parse(data).strings.initPage;
        let {
            bannerPreview,
            days,
            hours,
            minutes,
            seconds
        } = JSON.parse(data).strings.preview;
        let {
            enterName, pleaseEnterName, startDate,
            endDate, timerDisplay, banner,
            widget, timerPosition, top,
            displaysTimerTop, bottom, displaysTimerBottom,
            displaySticky, pagesShown, all,
            displayAtAll, collections, displayAtCollections,
            browseCollections, pickAllCollections, products,
            displayAtProducts, browseProducts, cancel,
            pickAllProducts, widgetDescription, widgetDescriptionText,
            widgetPlacement, aboveTitle, belowTitle,
            abovePrice, belowPrice, aboveBuyButton,
            belowBuyButton, productPagesWithTimer, utils, repeat
        } = JSON.parse(data).strings.primary;
        let {
            existingCountdownTimer,
            existingBadgeBanner,
            existingAnimationPopup,
            actions,
            timer,
            edit,
        } = JSON.parse(data).strings.existing_config;
        let {
            customize,
            save,
            pickAnimation,
            messageText,
            enterText,
            productPagesWithPopup,
            preview
        } = JSON.parse(data).strings.animations;
        let {
            pickCategory,
            category,
            pickBadge,
            bannerPlacement,
            productPagesWithBanner,
        } = JSON.parse(data).strings.badges;
        let {
            bannerDesign,
            warningTitle,
            warningMessage,
            reason,
            settings,
        } = JSON.parse(data).strings.countdown;
        let {
            mainHeading,
            messageTimer,
            messageBanner,
            messagePopup,
        } = JSON.parse(data).strings.success;
        let {
            createNew,
            createBanner,
            hereIsNo,
            toastMessage
        } = JSON.parse(data).strings.mainScreen;

        let stringsToTranslate = [
            bannerName, goToConfig, secondPageMainSign, countdownTimerBar,
            countdownDescription, countdownRevenue, saleBanner, saleBannerDescription,
            saleBannerRevenue, animationBanner, animationDescription, animationRevenue,
            timerDesign, backgroundColor, bannerHeight, borderWidth,
            borderColor, bannerTexts, firstText, pleaseEnterText,
            secondText, discountLink, title, link, mainHeader, subheader, button,
            bannerPreview, days, hours, minutes, seconds,
            enterName, pleaseEnterName, startDate,
            endDate, timerDisplay, banner,
            widget, timerPosition, top,
            displaysTimerTop, bottom, displaysTimerBottom,
            displaySticky, pagesShown, all,
            displayAtAll, collections, displayAtCollections,
            browseCollections, pickAllCollections, products,
            displayAtProducts, browseProducts, cancel,
            pickAllProducts, widgetDescription, widgetDescriptionText,
            widgetPlacement, aboveTitle, belowTitle,
            abovePrice, belowPrice, aboveBuyButton,
            belowBuyButton, productPagesWithTimer, utils, repeat,
            existingCountdownTimer, existingBadgeBanner, existingAnimationPopup,
            actions, timer, edit, customize, save, pickAnimation, messageText,
            enterText, productPagesWithPopup, preview,
            pickCategory, category, pickBadge, bannerPlacement, productPagesWithBanner,
            bannerDesign, warningTitle, warningMessage, reason, settings,
            mainHeading, messageTimer, messageBanner, messagePopup,
            createNew, createBanner, hereIsNo, toastMessage,
            'Продолжить', _delete, homeButton, mainScreenSign
        ];

        // axios.post('https://yahpv14nl5.execute-api.eu-north-1.amazonaws.com/v1/translate',
        //     { "source": "en", "target": localization, "text": endDate})
        //     .then(res => {
        //         console.log(res.data)
        //     })

        let counter = 0;
        let translatedArr = [];

        function translation() {
            if (counter < stringsToTranslate.length){
                axios.post('https://yahpv14nl5.execute-api.eu-north-1.amazonaws.com/v1/translate',
                    { "source": JSON.parse(data).locale, "target": localization, "text": stringsToTranslate[counter]})
                    .then(res => {
                        translatedArr.push(res.data.body);
                        console.log(res.data.body);
                        translation()
                    })
                    .catch(e => {
                        console.log('error recurring:', e);
                        translatedArr.push('___');
                        translation()
                    })
            }
            else {
                const [
                    bannerName, goToConfig, secondPageMainSign, countdownTimerBar,
                    countdownDescription, countdownRevenue, saleBanner, saleBannerDescription,
                    saleBannerRevenue, animationBanner, animationDescription, animationRevenue,
                    timerDesign, backgroundColor, bannerHeight, borderWidth,
                    borderColor, bannerTexts, firstText, pleaseEnterText,
                    secondText, discountLink, title, link, mainHeader, subheader, button,
                    bannerPreview, days, hours, minutes, seconds,
                    enterName, pleaseEnterName, startDate,
                    endDate, timerDisplay, banner,
                    widget, timerPosition, top,
                    displaysTimerTop, bottom, displaysTimerBottom,
                    displaySticky, pagesShown, all,
                    displayAtAll, collections, displayAtCollections,
                    browseCollections, pickAllCollections, products,
                    displayAtProducts, browseProducts, cancel,
                    pickAllProducts, widgetDescription, widgetDescriptionText,
                    widgetPlacement, aboveTitle, belowTitle,
                    abovePrice, belowPrice, aboveBuyButton,
                    belowBuyButton, productPagesWithTimer, utils, repeat,
                    existingCountdownTimer, existingBadgeBanner, existingAnimationPopup,
                    actions, timer, edit, customize, save, pickAnimation, messageText,
                    enterText, productPagesWithPopup, preview,
                    pickCategory, category, pickBadge, bannerPlacement, productPagesWithBanner,
                    bannerDesign, warningTitle, warningMessage, reason, settings,
                    mainHeading, messageTimer, messageBanner, messagePopup,
                    createNew, createBanner, hereIsNo, toastMessage,
                    _continue, _delete, homeButton, mainScreenSign
                ] = translatedArr;
                let locale = {
                    bannerInfo: {bannerName, goToConfig},
                    bannerVariants: {
                        secondPageMainSign,
                        countdownTimerBar,
                        countdownDescription,
                        countdownRevenue,
                        saleBanner,
                        saleBannerDescription,
                        saleBannerRevenue,
                        animationBanner,
                        animationDescription,
                        animationRevenue,
                        continue: _continue
                    },
                    design: {
                        timerDesign,
                        backgroundColor,
                        bannerHeight,
                        borderWidth,
                        borderColor,
                        bannerTexts,
                        firstText,
                        pleaseEnterText,
                        secondText,
                        discountLink,
                        title,
                        link,
                    },
                    initPage: {
                        mainHeader,
                        subheader,
                        button
                    },
                    preview: {
                        bannerPreview,
                        days,
                        hours,
                        minutes,
                        seconds
                    },
                    primary: {
                        enterName, pleaseEnterName, startDate,
                        endDate, timerDisplay, banner,
                        widget, timerPosition, top,
                        displaysTimerTop, bottom, displaysTimerBottom,
                        displaySticky, pagesShown, all,
                        displayAtAll, collections, displayAtCollections,
                        browseCollections, pickAllCollections, products,
                        displayAtProducts, browseProducts, cancel,
                        pickAllProducts, widgetDescription, widgetDescriptionText,
                        widgetPlacement, aboveTitle, belowTitle,
                        abovePrice, belowPrice, aboveBuyButton,
                        belowBuyButton, productPagesWithTimer, utils, repeat
                    },
                    existing_config: {
                        existingCountdownTimer,
                        existingBadgeBanner,
                        existingAnimationPopup,
                        actions,
                        timer,
                        edit,
                        delete: _delete
                    },
                    animations: {
                        customize,
                        save,
                        pickAnimation,
                        messageText,
                        enterText,
                        productPagesWithPopup,
                        preview
                    },
                    badges: {
                        pickCategory,
                        category,
                        pickBadge,
                        bannerPlacement,
                        productPagesWithBanner,
                    },
                    countdown: {
                        bannerDesign,
                        warningTitle,
                        warningMessage,
                        reason,
                        settings,
                    },
                    success: {
                        mainHeading,
                        messageTimer,
                        messageBanner,
                        messagePopup,
                        button: homeButton
                    },
                    mainScreen: {
                        secondPageMainSign: mainScreenSign,
                        createNew,
                        createBanner,
                        hereIsNo,
                        toastMessage
                    }
                };
                fs.writeFile(`./translateStorage/${localization}_locale.json`, JSON.stringify(locale), (err) => {
                    if (err) {
                        console.log(err)
                    } else console.log('file saved')
                });
            }
            counter++
        }

        translation();

        // let arr = stringsToTranslate.map(s => {
        //     console.log(s);
        //     return axios.post('https://yahpv14nl5.execute-api.eu-north-1.amazonaws.com/v1/translate',
        //     { "source": JSON.parse(data).locale, "target": localization, "text": s})});
        //
        // Promise.all(arr).then(values => {

        //         if (!!v.data.body) {
        //             return v.data.body
        //         }
        //         else return '---'
        //     });

        // axios.post('https://yahpv14nl5.execute-api.eu-north-1.amazonaws.com/v1/translate',
        //     { "source": "en", "target": localization, "text": stringsToTranslate.join('/')})
        //     .then(res => {
        //         console.log(res.data);
        //         const [
        //             bannerName, goToConfig, secondPageMainSign, countdownTimerBar,
        //             countdownDescription, countdownRevenue, saleBanner, saleBannerDescription,
        //             saleBannerRevenue, animationBanner, animationDescription, animationRevenue,
        //             timerDesign, backgroundColor, bannerHeight, borderWidth,
        //             borderColor, bannerTexts, firstText, pleaseEnterText,
        //             secondText, discountLink, title, link, mainHeader, subheader, button,
        //             bannerPreview, days, hours, minutes, seconds,
        //             enterName, pleaseEnterName, startDate,
        //             endDate, timerDisplay, banner,
        //             widget, timerPosition, top,
        //             displaysTimerTop, bottom, displaysTimerBottom,
        //             displaySticky, pagesShown, all,
        //             displayAtAll, collections, displayAtCollections,
        //             browseCollections, pickAllCollections, products,
        //             displayAtProducts, browseProducts, cancel,
        //             pickAllProducts, widgetDescription, widgetDescriptionText,
        //             widgetPlacement, aboveTitle, belowTitle,
        //             abovePrice, belowPrice, aboveBuyButton,
        //             belowBuyButton, productPagesWithTimer, utils, repeat,
        //             existingCountdownTimer, existingBadgeBanner, existingAnimationPopup,
        //             actions, timer, edit, customize, save, pickAnimation, messageText,
        //             enterText, productPagesWithPopup, preview,
        //             pickCategory, category, pickBadge, bannerPlacement, productPagesWithBanner,
        //             bannerDesign, warningTitle, warningMessage, reason, settings,
        //             mainHeading, messageTimer, messageBanner, messagePopup,
        //             createNew, createBanner, hereIsNo, toastMessage,
        //             _continue, _delete, homeButton, mainScreenSign
        //         ] = res.data.body.split('/');
        //         let locale = {
        //             bannerInfo: {bannerName, goToConfig},
        //             bannerVariants: {
        //                 secondPageMainSign,
        //                 countdownTimerBar,
        //                 countdownDescription,
        //                 countdownRevenue,
        //                 saleBanner,
        //                 saleBannerDescription,
        //                 saleBannerRevenue,
        //                 animationBanner,
        //                 animationDescription,
        //                 animationRevenue,
        //                 continue: _continue
        //             },
        //             design: {
        //                 timerDesign,
        //                 backgroundColor,
        //                 bannerHeight,
        //                 borderWidth,
        //                 borderColor,
        //                 bannerTexts,
        //                 firstText,
        //                 pleaseEnterText,
        //                 secondText,
        //                 discountLink,
        //                 title,
        //                 link,
        //             },
        //             initPage: {
        //                 mainHeader,
        //                 subheader,
        //                 button
        //             },
        //             preview: {
        //                 bannerPreview,
        //                 days,
        //                 hours,
        //                 minutes,
        //                 seconds
        //             },
        //             primary: {
        //                 enterName, pleaseEnterName, startDate,
        //                 endDate, timerDisplay, banner,
        //                 widget, timerPosition, top,
        //                 displaysTimerTop, bottom, displaysTimerBottom,
        //                 displaySticky, pagesShown, all,
        //                 displayAtAll, collections, displayAtCollections,
        //                 browseCollections, pickAllCollections, products,
        //                 displayAtProducts, browseProducts, cancel,
        //                 pickAllProducts, widgetDescription, widgetDescriptionText,
        //                 widgetPlacement, aboveTitle, belowTitle,
        //                 abovePrice, belowPrice, aboveBuyButton,
        //                 belowBuyButton, productPagesWithTimer, utils, repeat
        //             },
        //             existing_config: {
        //                 existingCountdownTimer,
        //                 existingBadgeBanner,
        //                 existingAnimationPopup,
        //                 actions,
        //                 timer,
        //                 edit,
        //                 delete: _delete
        //             },
        //             animations: {
        //                 customize,
        //                 save,
        //                 pickAnimation,
        //                 messageText,
        //                 enterText,
        //                 productPagesWithPopup,
        //                 preview
        //             },
        //             badges: {
        //                 pickCategory,
        //                 category,
        //                 pickBadge,
        //                 bannerPlacement,
        //                 productPagesWithBanner,
        //             },
        //             countdown: {
        //                 bannerDesign,
        //                 warningTitle,
        //                 warningMessage,
        //                 reason,
        //                 settings,
        //             },
        //             success: {
        //                 mainHeading,
        //                 messageTimer,
        //                 messageBanner,
        //                 messagePopup,
        //                 button: homeButton
        //             },
        //             mainScreen: {
        //                 secondPageMainSign: mainScreenSign,
        //                 createNew,
        //                 createBanner,
        //                 hereIsNo,
        //                 toastMessage
        //             }
        //         };
        //         console.log(locale);
        //         // fs.writeFile(`./translateStorage/${localization}_locale.js`, JSON.stringify(locale), (err) => {
        //         //     if (err){
        //         //         console.log(err)
        //         //     }
        //         //     else console.log('file saved')
        //         // });
        //     })
        //     .catch(e => console.log(e))
    }
});

//axios.post('https://yahpv14nl5.execute-api.eu-north-1.amazonaws.com/v1/translate', {});

//fs.writeFile("./translateStorage/ru_locale.json", locale);