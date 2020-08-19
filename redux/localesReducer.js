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
                secondPageMainSign: "Select the element with which you want to increase your revenue.",
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
                timer: "Timer",
                edit: "Edit",
                delete: "Delete"
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
                preview: "Popup preview"
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
                bannerDesign: "Banner design",
                warningTitle: "Banner interception detected",
                warningMessage: "This banner are going to render on the same pages there the existing " +
                    "one of this type has been already rendered. This will cause critical malfunctions." +
                    "Please, check vulnerabilities below and correct them",
                reason: "Vulnerability:",
                settings: "Settings",
                save: "Save"
            },
            success: {
                mainHeading: "Congratulations!",
                messageTimer: "You have created Countdown timer bar. Now please wait some days and your revenue will be increased for 25%.",
                messageBanner: "You have created Sale banner. Now please wait some days and your revenue will be increased for 15%.",
                messagePopup: "You have created Pop-up. Now please wait some days and your revenue will be increased for 20%.",
                button: "Home"
            },
            mainScreen: {
                secondPageMainSign: "Your Banners:",
                createNew: "Create new",
                createBanner: "Create banner",
                hereIsNo: "No banner of this type has been created yet",
                toastMessage: "Banner deleted"
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
                    secondPageMainSign: "Select the element with which you want to increase your revenue.",
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
                    timer: "Timer",
                    edit: "Edit",
                    delete: "Delete"
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
                    preview: "Popup preview"
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
                    messageTimer: "You have created Countdown timer bar. Now please wait some days and your revenue will be increased for 25%.",
                    messageBanner: "You have created Sale banner. Now please wait some days and your revenue will be increased for 15%.",
                    messagePopup: "You have created Pop-up. Now please wait some days and your revenue will be increased for 20%.",
                    button: "Go to main"
                },
                mainScreen: {
                    secondPageMainSign: "Your Banners:",
                    createNew: "Create new",
                    createBanner: "Create banner",
                    hereIsNo: "No banner of this type has been created yet",
                    toastMessage: "Banner deleted"
                }
            }
        },
        {
            "locale": "ru",
            "strings": {
                "bannerInfo": {
                    "bannerName": "Название баннера:",
                    "goToConfig": "Перейти к конфигурации"
                },
                "bannerVariants": {
                    "secondPageMainSign": "Выберите элемент, с помощью которого вы хотите увеличить свой доход.",
                    "countdownTimerBar": "Панель таймера обратного отсчета",
                    "countdownDescription": "Специальный таймер обратного отсчета, который может отображаться на продукте или других страницах, означает, что распродажа началась!",
                    "countdownRevenue": "Примерно на 20% больше выручки",
                    "saleBanner": "Рекламная вывеска",
                    "saleBannerDescription": "Невероятная вывеска, которая подчернет уникальность ваших продуктов.",
                    "saleBannerRevenue": "Примерно на 25% больше выручки",
                    "animationBanner": "Модальное окно с анимацией",
                    "animationDescription": "Подарочная анимация Вашим клиентам!",
                    "animationRevenue": "Примерно на 15% больше выручки",
                    "continue": "Продолжить"
                },
                "design": {
                    "timerDesign": "Дизайн таймера",
                    "backgroundColor": "Цвет фона:",
                    "bannerHeight": "Высота баннера",
                    "borderWidth": "Ширина границы:",
                    "borderColor": "Цвет границы",
                    "bannerTexts": "Тексты баннеров:",
                    "firstText": "Первый текст",
                    "pleaseEnterText": "Пожалуйста, введите текст",
                    "secondText": "Второй текст",
                    "discountLink": "Ссылка на скидку",
                    "title": "Заголовок",
                    "link": "Ссылка:"
                },
                "initPage": {
                    "mainHeader": "TopSale Countdown Banner",
                    "subheader": "Увеличивайте продажи с помощью таймера обратного отсчета, анимаций и потрясающих баннеров",
                    "button": "Создать баннер"
                },
                "preview": {
                    "bannerPreview": "Предпросмотр",
                    "days": "Дни",
                    "hours": "Часы",
                    "minutes": "Минуты",
                    "seconds": "Секунды"
                },
                "primary": {
                    "enterName": "Введите имя...",
                    "pleaseEnterName": "Пожалуйста, введите имя",
                    "startDate": "Дата начала",
                    "endDate": "Дата окончания",
                    "timerDisplay": "Дисплей таймера",
                    "banner": "Баннер",
                    "widget": "Виджет",
                    "timerPosition": "Положение таймера на странице",
                    "top": "Топ",
                    "displaysTimerTop": "Отображает таймер в верхней части магазина.",
                    "bottom": "Снизу",
                    "displaysTimerBottom": "Отображает таймер в нижней части магазина.",
                    "displaySticky": "Отобразить закрепленно",
                    "pagesShown": "Страницы, на которых отображается таймер",
                    "all": "Все",
                    "displayAtAll": "Отображает таймер на всех страницах.",
                    "collections": "Коллекции",
                    "displayAtCollections": "Отображает таймер на определенных страницах коллекций.",
                    "browseCollections": "Загрузить коллекции",
                    "pickAllCollections": "Выбрать все коллекции",
                    "products": "Товары",
                    "displayAtProducts": "Отображает таймер на определенных страницах товаров.",
                    "browseProducts": "Загрузить товары",
                    "cancel": "Отменить",
                    "pickAllProducts": "Выбрать все товары",
                    "widgetDescription": "Описание виджета",
                    "widgetDescriptionText": "Компактный таймер, доступный только на страницах товаров.",
                    "widgetPlacement": "Расположение виджета",
                    "aboveTitle": "Над заголовком",
                    "belowTitle": "Под заголовком",
                    "abovePrice": "Выше цены",
                    "belowPrice": "Ниже цены",
                    "aboveBuyButton": "Над кнопкой «Купить»",
                    "belowBuyButton": "Под кнопкой «Купить»",
                    "productPagesWithTimer": "Страницы товаров с таймером",
                    "utils": "Утилиты",
                    "repeat": "Повторить таймер, когда он закончится"
                },
                "existing_config": {
                    "existingCountdownTimer": "Существующий таймер обратного отсчета:",
                    "existingBadgeBanner": "Существующий баннер",
                    "existingAnimationPopup": "Существующее модальное окно анимации:",
                    "actions": "Действия:",
                    "timer": "Таймер",
                    "edit": "Редактировать",
                    "delete": "Удалить"
                },
                "animations": {
                    "customize": "Настройте свое модальное окно!",
                    "save": "Сохранить",
                    "pickAnimation": "Выберите анимацию",
                    "messageText": "Ваше сообщение:",
                    "enterText": "Введите текст...",
                    "productPagesWithPopup": "Страницы товаров с модальным окном:",
                    "preview": "Предварительный просмотр модального окна"
                },
                "badges": {
                    "pickCategory": "Выберите категорию",
                    "category": "Категория:",
                    "pickBadge": "Выбрать значок",
                    "bannerPlacement": "Размещение баннеров",
                    "productPagesWithBanner": "Страницы товаров с баннером"
                },
                "countdown": {
                    "bannerDesign": "Дизайн баннера",
                    "warningTitle": "Обнаружено наложение баннеров",
                    "warningMessage": "Этот баннер будет отображен на странице, где уже есть баннер этого типа. Это вызовет нарушения в работе баннеров. Пожалуйста, просмотрите уязвимости и исправьте их",
                    "reason": "Уязвимость:",
                    "settings": "Настройки"
                },
                "success": {
                    "mainHeading": "Поздравляем!",
                    "messageTimer": "Вы создали таймер обратного отсчета. Теперь, пожалуйста, подождите несколько дней, и ваш доход будет увеличен на 25%.",
                    "messageBanner": "Вы создали товарную вывеску. Теперь, пожалуйста, подождите несколько дней, и ваш доход будет увеличен на 15%.",
                    "messagePopup": "Вы создали модальное окно. Теперь, пожалуйста, подождите несколько дней, и ваш доход будет увеличен на 20%.",
                    "button": "Главная"
                },
                "mainScreen": {
                    "secondPageMainSign": "Ваши баннеры:",
                    "createNew": "Создать новый",
                    "createBanner": "Создать баннер",
                    "hereIsNo": "Баннер этого типа еще не создан",
                    "toastMessage": "Баннер удален"
                }
            }
        },
        {
            "bannerInfo": {
                "bannerName": "Banner Name:",
                "goToConfig": "Gehe zu Konfiguration"
            },
            "bannerVariants": {
                "secondPageMainSign": "Wählen Sie den Artikel aus, mit dem Sie Ihr Einkommen erhöhen möchten.",
                "countdownTimerBar": "Countdown-Timer-Panel",
                "countdownDescription": "Ein spezieller Countdown-Timer, der auf einem Produkt oder anderen Seiten angezeigt werden kann, bedeutet, dass der Verkauf begonnen hat!",
                "countdownRevenue": "Ca. 20% mehr Umsatz",
                "saleBanner": "Werbung Schild",
                "saleBannerDescription": "Ein unglaubliches Zeichen, das die Einzigartigkeit Ihrer Produkte hervorhebt.",
                "saleBannerRevenue": "Ca. 25% mehr Umsatz",
                "animationBanner": "Modales Fenster mit Animation",
                "animationDescription": "Geschenk-Animation für Ihre Kunden!",
                "animationRevenue": "Ca. 15% mehr Umsatz",
                "continue": "---"
            },
            "design": {
                "timerDesign": "Timer-Design",
                "backgroundColor": "Hintergrundfarbe:",
                "bannerHeight": "Banner-Höhe",
                "borderWidth": "Begrenzungsbreite:",
                "borderColor": "Farbe des Rahmens",
                "bannerTexts": "Banner-Texte:",
                "firstText": "Erster Text",
                "pleaseEnterText": "Bitte geben Sie den Text ein",
                "secondText": "---",
                "discountLink": "Rabatt-Link",
                "title": "Schlagzeile",
                "link": "Referenz:"
            },
            "initPage": {
                "mainHeader": "TopSale Countdown Banner",
                "subheader": "Steigern Sie den Umsatz mit Countdown-Timer, Animationen und atemberaubenden Banner",
                "button": "Banner erstellen"
            },
            "preview": {
                "bannerPreview": "Vorschau",
                "days": "Tage",
                "hours": "Stunden",
                "minutes": "Protokoll",
                "seconds": "Nachschlag"
            },
            "primary": {
                "enterName": "Geben Sie einen Namen ein...",
                "pleaseEnterName": "Bitte geben Sie den Namen ein",
                "startDate": "---",
                "endDate": "---",
                "timerDisplay": "Timer-Anzeige",
                "banner": "---",
                "widget": "Widget",
                "timerPosition": "Timer-Position auf Seite",
                "top": "---",
                "displaysTimerTop": "Zeigt den Timer am oberen Rand des Ladens an.",
                "bottom": "Unterseite",
                "displaysTimerBottom": "---",
                "displaySticky": "---",
                "pagesShown": "Seiten, auf denen der Timer angezeigt wird",
                "all": "Alle",
                "displayAtAll": "---",
                "collections": "Sammlungen",
                "displayAtCollections": "---",
                "browseCollections": "---",
                "pickAllCollections": "Alle Sammlungen auswählen",
                "products": "---",
                "displayAtProducts": "Zeigt einen Timer auf bestimmten Produktseiten an.",
                "browseProducts": "---",
                "cancel": "---",
                "pickAllProducts": "---",
                "widgetDescription": "---",
                "widgetDescriptionText": "---",
                "widgetPlacement": "---",
                "aboveTitle": "---",
                "belowTitle": "---",
                "abovePrice": "---",
                "belowPrice": "---",
                "aboveBuyButton": "---",
                "belowBuyButton": "Unter dem Button „Kaufen“",
                "productPagesWithTimer": "---",
                "utils": "Dienstprogramme",
                "repeat": "---"
            },
            "existing_config": {
                "existingCountdownTimer": "---",
                "existingBadgeBanner": "---",
                "existingAnimationPopup": "Vorhandenes modales Animationsfenster:",
                "actions": "---",
                "timer": "Zeitschaltuhr",
                "edit": "Bearbeiten",
                "delete": "---"
            },
            "animations": {
                "customize": "---",
                "save": "---",
                "pickAnimation": "---",
                "messageText": "---",
                "enterText": "---",
                "productPagesWithPopup": "---",
                "preview": "---"
            },
            "badges": {
                "pickCategory": "---",
                "category": "---",
                "pickBadge": "---",
                "bannerPlacement": "---",
                "productPagesWithBanner": "---"
            },
            "countdown": {
                "bannerDesign": "---",
                "warningTitle": "---",
                "warningMessage": "---",
                "reason": "Schwachstelle:",
                "settings": "Einstellungen"
            },
            "success": {
                "mainHeading": "---",
                "messageTimer": "---",
                "messageBanner": "---",
                "messagePopup": "---",
                "button": "Zuhause"
            },
            "mainScreen": {
                "secondPageMainSign": "---",
                "createNew": "---",
                "createBanner": "---",
                "hereIsNo": "Banner dieses Typs wurde noch nicht erstellt",
                "toastMessage": "---"
            }
        }
        ]
};

export const localesReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LOCALES: return {
            ...state,
            stringsToDisplay: state.localesStorage
                .find(l => action.locale === l.locale)
        };
        default: return state
    }
};

export const setLocales = (locale) => ({type: SET_LOCALES, locale});