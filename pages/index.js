import {
    Button,
    Card, Checkbox, ColorPicker,
    DatePicker,
    EmptyState,
    Layout,
    Page, InlineError,
    RadioButton,
    ResourceList, Stack,
    TextField, Popover, RangeSlider, Spinner
} from "@shopify/polaris";
import {useCallback, useState, useEffect} from "react";
import Link from 'next/link'
import axios from 'axios'
import DesignSection from "../components/design";
import PrimaryDesign from "../components/primary";
import * as Scroll from 'react-scroll'

const Initial = () => {

    useEffect(() => {
        axios.get('https://lil-shopify.herokuapp.com/api/script').then(res => {
            fetchData(res.data);
            setLoading(false);
        });
    }, []);

    const [isLoading, setLoading] = useState(true);
    const [isMainConfig, setConfigMenu] = useState(true);
    const [scriptData, fetchData] = useState(false);
    const [initBar, setInitBar] = useState(false);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [firstText, setFirstText] = useState('Hurry Up!');
    const [secondText, setSecondText] = useState('Flash Sale');

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

    const [value, setValue] = useState('Top');
    const [renderValue, setRenderValue] = useState('all');
    const [checked, setChecked] = useState(false);
    const [isRepeatable, setRepeat] = useState(false);

    const [bgColor, setBgColor] = useState({
        hue: 1,
        saturation: 1,
        brightness: 1,
        alpha: 1
    });
    const [borderColor, setBorderColor] = useState({
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
        if ((Date.parse(selectedEndDate.end) - Date.parse(selectedStartDate.start) <= 0)){
            setDateError(true)
        }
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

    const startDateText = <div style={{width: '200px'}} onClick={toggleStartPopover} onBlur={dateCheck}>
        <TextField
        label={''}
        value={selectedStartDate.start.toLocaleDateString()}
        error={(startError && switchTouch) ? 'Please enter date' : ''}
    /></div>;
    const endDateText = <div style={{width: '200px'}} onClick={toggleEndPopover} onBlur={dateCheck}>
        <TextField
            label={''}
            value={selectedEndDate.end.toLocaleDateString()}
            error={((!(selectedEndDate.end.toLocaleDateString())) && switchTouch) ? 'Please enter date' :
                (dateError ? 'End date cannot be earlier than start date' : '')}
        /></div>;

    const [products, pickProducts] = useState([]);

    const [rangeValue, setRangeValue] = useState(0);
    const [heightValue, setHeightValue] = useState(100);

    const handleRangeSliderChange = useCallback(
        (value) => setRangeValue(value),
        [],
    );
    const handleHeightSliderChange = useCallback(
        (value) => setHeightValue(value),
        []
    );

    const [isLinkActive, activateLink] = useState(false);
    const [linkText, setLinkText] = useState('Get discount!');
    const [href, setHref] = useState('https://');

    const designSwitch = () => {
        if (!!name) {
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
        let res = await axios.post('https://lil-shopify.herokuapp.com/api/script',
            {
                name,
                startDate: selectedStartDate,
                endDate: selectedEndDate,
                position: value,
                display: renderValue,
                sticky: checked,
                backGroundColor: bgColor,
                bannerHeight: heightValue,
                borderSize: rangeValue,
                borderColor,
                isRepeatable,
                firstText,
                secondText,
                idsOfProducts: products.map(p => p.handle),
                isLinkActive,
                linkText,
                href
            });
        console.log(res);
    };

    const deleteSubmit = () => {
        axios.delete('https://lil-shopify.herokuapp.com/api/script').then(res => {
            console.log(res)
        });
        axios.get('https://lil-shopify.herokuapp.com/api/script').then(res => {
            fetchData(res.data);
        });
    };

    if (isLoading) return <Page><Layout><Spinner accessibilityLabel="Spinner example" size="large" color="" /></Layout></Page>;
    else return (
        <Page>
            {!initBar && <Layout>
                {!scriptData.config && <Layout.Section>
                    <EmptyState
                        heading={`Sale Banner`}
                        image={'https://sct.spur-i-t.com/img/icons/empty-state.svg'}>
                        <Button
                            primary
                            size={"slim"}
                            type={"submit"}
                            onClick={() => {
                                setInitBar(true)
                            }}
                        >
                            Create Banner
                        </Button>
                    </EmptyState>
                </Layout.Section>}
                {!!scriptData.config && <Layout.Section>
                    <Card title={"Existing Banner:"} sectioned>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", padding: '10px', borderBottom: "1px solid grey"}}>
                            <p>Banner name:</p>
                            <p>Actions:</p>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", padding: '10px'}}>
                        <b style={{fontSize: "24px"}}>{scriptData.script[0].configData?renderData(scriptData.script[0].configData.name):"Timer"}</b>
                            <Button
                                primary
                                destructive
                                size={"slim"}
                                type={"submit"}
                                onClick={deleteSubmit}>
                                Delete Banner
                            </Button>
                        </div>
                    </Card>
                </Layout.Section>}
            </Layout>}
            {initBar && <Layout>
                <Layout.Section>
                {isMainConfig ? <Layout.Section>
                    {isMainConfig && <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '25px'}}>
                        <div style={{fontSize: '24px', fontWeight: '600'}}>
                            Customize your banner!
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
                    />}
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '25px', marginLeft: '20px'}}>
                    <Button
                        size={"large"}
                        type={"submit"}
                        onClick={designSwitch}
                    >
                        {isMainConfig ? 'Banner design' : 'Settings'}
                    </Button>
                    <Link href={'/success'}>
                        <Button
                            primary
                            size={"large"}
                            type={"submit"}
                            onClick={handleSubmit}
                            disabled={!name}
                        >
                            Save
                        </Button>
                    </Link>
                </div>
                </Layout.Section>
            </Layout>}

        </Page>
    )
};

export default Initial
