import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Icon, Layout, Page, TextField} from "@shopify/polaris";
import {CalendarMinor, DeleteMajorMonotone, SettingsMajorMonotone} from "@shopify/polaris-icons";
import * as Scroll from "react-scroll";
import BannerVariants from "../components/bannerVariants";
import InitPage from "../components/initPage";
import PrimaryDesign from "../components/primary";
import DesignSection from "../components/design";
import Link from "next/link";
import {connect} from "react-redux";


const Countdown = (props) => {

    useEffect(() => {
        fetchData(props.config.find(c => c.id === props.dispatchedId))
    }, []);

    const [isLoading, setLoading] = useState(true);
    const [isMainConfig, setConfigMenu] = useState(true);
    const [isWidget, setIsWidget] = useState(false);
    const [scriptData, fetchData] = useState(false);
    const [initBar, setInitBar] = useState(false);
    const [name, setName] = useState(scriptData.config ? scriptData.script[0].configData.name : '');
    const [nameError, setNameError] = useState(false);
    const [firstText, setFirstText] = useState(scriptData.config ? scriptData.script[0].configData.firstText : 'Hurry Up!');
    const [secondText, setSecondText] = useState(scriptData.config ? scriptData.script[0].configData.secondText : 'Flash Sale');

    const [{month, year}, setDate] = useState({
        month: 6,
        year: 2020,
    });

    const [{endMonth, endYear}, setSecondDate] = useState({
        endMonth: 7,
        endYear: 2020
    });

    const [selectedStartDate, setSelectedStartDate] = useState({
        start: new Date(),
    });
    const [selectedEndDate, setSelectedEndDate] = useState({
        end: {
            toLocaleDateString(){return ''},
            getDate(){return 1},
            getMonth(){return 6},
            getFullYear() {return 2020}
        },
    });
    //new Date('Wed Aug 08 2020 00:00:00 GMT-0300 (EST)')
    const [isEndDateTouched, touchEndDate] = useState(false);

    const handleMonthChange = useCallback(
        (month, year) => setDate({month, year}),
        [],
    );
    const handleEndMonthChange = useCallback(
        (endMonth, endYear) => setSecondDate({endMonth, endYear}),
        [],
    );

    const [value, setValue] = useState(scriptData.config ? scriptData.script[0].configData.position : 'Top');
    const [renderValue, setRenderValue] = useState(scriptData.config ? scriptData.script[0].configData.display : 'all');
    const [checked, setChecked] = useState(scriptData.config ? scriptData.script[0].configData.sticky : false);
    const [isRepeatable, setRepeat] = useState(scriptData.config ? scriptData.script[0].configData.isRepeatable : false);

    const [bgColor, setBgColor] = useState(scriptData.config ? scriptData.script[0].configData.backGroundColor : {
        hue: 1,
        saturation: 1,
        brightness: 1,
        alpha: 1
    });
    const [borderColor, setBorderColor] = useState(scriptData.config ? scriptData.script[0].configData.borderColor : {
        hue: 1,
        saturation: 1,
        brightness: 1,
        alpha: 1
    });

    const handleChange = useCallback(
        (_checked, newValue) => setValue(newValue),
        [],
    );
    const handleRenderValueChange = useCallback(
        (_checked, newValue) => setRenderValue(newValue),
        []
    );

    const handleDateTouch = useCallback(
        () => touchEndDate(true),
        []
    );

    const renderData = (data) => <p>{data}</p>;

    const [popoverActive, setPopoverActive] = useState(false);
    const [borderPopover, setBorderPopover] = useState(false);

    const [startDatePopover, setStartDatePopover] = useState(false);
    const [endDatePopover, setEndDatePopover] = useState(false);

    const [startError, setStartError] = useState('');
    const [endError, setEndError] = useState('');
    const [switchTouch, switchAttempt] = useState(false);
    const [dateError, setDateError] = useState(false);

    const dateCheck = () => {
        if ((Date.parse(selectedEndDate.end) - Date.parse(selectedStartDate.start) < 0)){
            setDateError(true);
            console.log(Date.parse(selectedEndDate.end) - Date.parse(selectedStartDate.start))
        }
        else setDateError(false);
    };

    const togglePopoverActive = useCallback(() => setPopoverActive(popoverActive => !popoverActive), []);
    const toggleBorderPopover = useCallback(() => setBorderPopover(popoverActive => !popoverActive), []);

    const toggleStartPopover = useCallback(() => setStartDatePopover(popoverActive => !popoverActive), []);
    const toggleEndPopover = useCallback(() => setEndDatePopover(popoverActive => !popoverActive), []);

    const activator = <Button onClick={togglePopoverActive} disclosure>
        Background
        color
    </Button>;
    const borderActivator = <Button onClick={toggleBorderPopover} disclosure>
        Border color
    </Button>;

    const startDateText = <div style={{width: '200px'}} onClick={toggleStartPopover}>
        <TextField
            label={''}
            prefix={<Icon source={CalendarMinor} color="inkLighter" />}
            value={selectedStartDate.start.toLocaleDateString()}
            error={(startError && switchTouch) ? 'Please enter date' : ''}
        />
    </div>;
    const endDateText = <div style={{width: '200px'}} onClick={toggleEndPopover}>
        <TextField
            label={''}
            prefix={<Icon source={CalendarMinor} color="inkLighter" />}
            value={selectedEndDate.end.toLocaleDateString()}
            error={((!(selectedEndDate.end.toLocaleDateString())) && switchTouch) ? 'Please enter date' :
                (dateError ? 'End date cannot be earlier than start date' : '')}
        />
    </div>;

    const [products, pickProducts] = useState(scriptData.config ? scriptData.script[0].configData.products : []);
    const [isAllProducts, pickAllProducts] = useState(scriptData.config ? scriptData.script[0].configData.isAllProducts : false);
    const [collections, pickCollections] = useState(scriptData.config ? scriptData.script[0].configData.collections : []);
    const [isAllCollection, pickAllCollection] = useState(scriptData.config ? scriptData.script[0].configData.isAllCollection : false);

    const [widgetRenderValue, setWidgetValue] = useState('.product-single__title/append');

    const [rangeValue, setRangeValue] = useState(scriptData.config ? scriptData.script[0].configData.borderSize : 0);
    const [heightValue, setHeightValue] = useState(scriptData.config ? scriptData.script[0].configData.bannerHeight : 100);

    const handleRangeSliderChange = useCallback(
        (value) => setRangeValue(value),
        [],
    );
    const handleHeightSliderChange = useCallback(
        (value) => setHeightValue(value),
        []
    );

    const [isLinkActive, activateLink] = useState(scriptData.config ? scriptData.script[0].configData.isLinkActive : false);
    const [linkText, setLinkText] = useState(scriptData.config ? scriptData.script[0].configData.linkText : 'Get discount!');
    const [href, setHref] = useState(scriptData.config ? scriptData.script[0].configData.href : 'https://');

    useEffect(() => {
        console.log(scriptData);
        setName(scriptData.config ? scriptData.script[0].configData.name : '');
        setFirstText(scriptData.config ? scriptData.script[0].configData.firstText : 'Hurry up');
        setSecondText(scriptData.config ? scriptData.script[0].configData.secondText : 'Flesh sale!');
        setSelectedStartDate(scriptData.config ? {start: new Date(scriptData.script[0].configData.startDate.start)} : {start: new Date()});
        setSelectedEndDate(scriptData.config ? {end: new Date(scriptData.script[0].configData.endDate.end)} :  {
            end: {
                toLocaleDateString(){return ''},
                getDate(){return 1},
                getMonth(){return 6},
                getFullYear() {return 2020}
            },
        });
        setIsWidget(scriptData.config ? scriptData.script[0].configData.isWidget : false);
        setWidgetValue(scriptData.config ? scriptData.script[0].configData.widgetRenderValue : '.product-single__title/append');
        setValue(scriptData.config ? scriptData.script[0].configData.position : 'Top');
        setRenderValue(scriptData.config ? scriptData.script[0].configData.display : 'all');
        setChecked(scriptData.config ? scriptData.script[0].configData.sticky : false);
        setRepeat(scriptData.config ? scriptData.script[0].configData.isRepeatable : false);
        setBgColor(scriptData.config ? scriptData.script[0].configData.backGroundColor : {
            hue: 1,
            saturation: 1,
            brightness: 1,
            alpha: 1
        });
        setBorderColor(scriptData.config ? scriptData.script[0].configData.borderColor : {
            hue: 1,
            saturation: 1,
            brightness: 1,
            alpha: 1
        });
        pickProducts(scriptData.config ? scriptData.script[0].configData.products : []);
        pickAllProducts(scriptData.config ? scriptData.script[0].configData.isAllProducts : false);
        pickCollections(scriptData.config ? scriptData.script[0].configData.collections : []);
        pickAllCollection(scriptData.config ? scriptData.script[0].configData.isAllCollection : false);
        setRangeValue(scriptData.config ? scriptData.script[0].configData.borderSize : 0);
        setHeightValue(scriptData.config ? scriptData.script[0].configData.bannerHeight : 100);
        activateLink(scriptData.config ? scriptData.script[0].configData.isLinkActive : false);
        setLinkText(scriptData.config ? scriptData.script[0].configData.linkText : 'Get discount!');
        setHref(scriptData.config ? scriptData.script[0].configData.href : 'https://');

    }, [initBar]);

    const designSwitch = () => {
        if (!!name && !dateError && !!(selectedEndDate.end.toLocaleDateString())) {
            setConfigMenu(!isMainConfig)
        } else {
            Scroll.animateScroll.scrollToTop();
            switchAttempt(true)
        }
    };

    const handleNameError = useCallback(
        () => setNameError(true),
        []
    );

    const handleSubmit = async () => {
        console.log('submitted');
        const bundle = {
            id: scriptData.script[0].id,
            name,
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            position: value,
            display: renderValue,
            sticky: checked,
            isWidget,
            widgetRenderValue,
            backGroundColor: bgColor,
            bannerHeight: heightValue,
            borderSize: rangeValue,
            borderColor,
            isRepeatable,
            firstText,
            secondText,
            products,
            collections,
            isAllProducts,
            isAllCollection,
            isLinkActive,
            linkText,
            href
        };
        if (scriptData.config){
            let res = await axios.put('https://lil-shopify.herokuapp.com/api/script', bundle);
            console.log(res.data);
        }
        else {
            let res = await axios.post('https://lil-shopify.herokuapp.com/api/script', bundle);
            console.log(res.data);
        }
    };

    if (isLoading) return <Page><Layout><img src={
        'https://lil-proxy.herokuapp.com/static/Preloader.gif'
    } alt={'shock'}/></Layout></Page>;
    else return (
        <Page>
            <Layout>
                <Layout.Section>
                    {isMainConfig ? <Layout.Section>
                            {isMainConfig && <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '25px'}}>
                                <div style={{fontSize: '24px', fontWeight: '600'}}>
                                    {props.strings.customize}
                                </div>
                                <Button
                                    size={"medium"}
                                    type={"submit"}
                                    onClick={designSwitch}
                                >
                                    {isMainConfig ? 'Banner design' : 'Settings'}
                                </Button>
                            </div>}
                            <PrimaryDesign
                                name={name}
                                setName={setName}
                                nameError={nameError}
                                setNameError={setNameError}
                                handleNameError={handleNameError}
                                startDatePopover={startDatePopover}
                                startDateText={startDateText}
                                toggleStartPopover={toggleStartPopover}
                                setSelectedStartDate={setSelectedStartDate}
                                month={month}
                                year={year}
                                handleMonthChange={handleMonthChange}
                                endDatePopover={endDatePopover}
                                endDateText={endDateText}
                                toggleEndPopover={toggleEndPopover}
                                endMonth={endMonth}
                                endYear={endYear}
                                setSelectedEndDate={setSelectedEndDate}
                                handleEndMonthChange={handleEndMonthChange}
                                selectedEndDate={selectedEndDate}
                                value={value}
                                handleChange={handleChange}
                                checked={checked}
                                setChecked={setChecked}
                                renderValue={renderValue}
                                handleRenderValueChange={handleRenderValueChange}
                                isRepeatable={isRepeatable}
                                setRepeat={setRepeat}
                                switchTouch={switchTouch}
                                products={products}
                                pickProducts={pickProducts}
                                isAllProducts={isAllProducts}
                                pickAllProducts={pickAllProducts}
                                collections={collections}
                                pickCollections={pickCollections}
                                isAllCollection={isAllCollection}
                                pickAllCollection={pickAllCollection}
                                dateCheck={dateCheck}
                                handleRangeSliderChange={handleRangeSliderChange}
                                setBorderColor={setBorderColor}
                                isWidget={isWidget}
                                setIsWidget={setIsWidget}
                                widgetRenderValue={widgetRenderValue}
                                setWidgetValue={setWidgetValue}
                            />
                        </Layout.Section>
                        :
                        <DesignSection
                            popoverActive={popoverActive}
                            activator={activator}
                            togglePopoverActive={togglePopoverActive}
                            bgColor={bgColor}
                            setBgColor={setBgColor}
                            heightValue={heightValue}
                            handleHeightSliderChange={handleHeightSliderChange}
                            rangeValue={rangeValue}
                            handleRangeSliderChange={handleRangeSliderChange}
                            borderColor={borderColor}
                            borderActivator={borderActivator}
                            borderPopover={borderPopover}
                            toggleBorderPopover={toggleBorderPopover}
                            setBorderColor={setBorderColor}
                            setBorderPopover={setBorderPopover}
                            firstText={firstText}
                            setFirstText={setFirstText}
                            secondText={secondText}
                            setSecondText={setSecondText}
                            isLinkActive={isLinkActive}
                            activateLink={activateLink}
                            linkText={linkText}
                            setLinkText={setLinkText}
                            href={href}
                            setHref={setHref}
                            isWidget={isWidget}
                            setIsWidget={setIsWidget}
                        />}
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '25px', marginLeft: '20px'}}>
                        <Button
                            size={"large"}
                            type={"submit"}
                            onClick={designSwitch}
                        >
                            {isMainConfig ? props.strings.bannerDesign : props.strings.settings}
                        </Button>
                        <Link href={'/success'}>
                            <Button
                                primary
                                size={"large"}
                                type={"submit"}
                                onClick={handleSubmit}
                                disabled={!name || dateError || !(selectedEndDate.end.toLocaleDateString())}
                            >
                                {props.strings.save}
                            </Button>
                        </Link>
                    </div>
                </Layout.Section>
            </Layout>
        </Page>
    )
};

const mapStateToProps = (state) => ({
    config: state.configsReducer.countdownConfig,
    dispatchedId: state.configsReducer.dispatchedIds.countdownId,
    strings: state.localesReducer.stringsToDisplay.strings.countdown,
    configStrings: state.localesReducer.stringsToDisplay.strings.existing_config
});

export default connect(mapStateToProps)(Countdown)