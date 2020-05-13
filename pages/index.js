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

const Initial = () => {
    useEffect(() => {
        axios.get('https://lil-shopify.herokuapp.com/api/script').then(res => {
            fetchData(res.data);
            setLoading(false);
        });
    }, []);

    const [isLoading, setLoading] = useState(true);
    const [scriptData, fetchData] = useState(false);
    const [initBar, setInitBar] = useState(false);
    const [name, setName] = useState('Timer');

    const [{month, year}, setDate] = useState({
        month: 4,
        year: 2020,
    });
    const [{endMonth, endYear}, setSecondDate] = useState({
        endMonth: 6,
        endYear: 2020
    });
    const [selectedStartDate, setSelectedStartDate] = useState({
        start: new Date(),
    });
    const [selectedEndDate, setSelectedEndDate] = useState({
        end: new Date('Wed Aug 08 2020 00:00:00 GMT-0300 (EST)'),
    });

    const handleMonthChange = useCallback(
        (month, year) => setDate({month, year}),
        [],
    );
    const handleEndMonthChange = useCallback(
        (endMonth, endYear) => setSecondDate({endMonth, endYear}),
        [],
    );

    const [value, setValue] = useState('Top');
    const [checked, setChecked] = useState(false);

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

    const renderData = (data) => <p>{data}</p>;

    const [popoverActive, setPopoverActive] = useState(true);
    const [borderPopover, setBorderPopover] = useState(true);

    const togglePopoverActive = useCallback(() => setPopoverActive(popoverActive => !popoverActive), []);
    const toggleBorderPopover = useCallback(() => setBorderPopover(popoverActive => !popoverActive), []);
    const activator = <Button onClick={togglePopoverActive} disclosure>
        Background
        color
    </Button>;
    const borderActivator = <Button onClick={toggleBorderPopover} disclosure>
        Border color
    </Button>;

    const [rangeValue, setRangeValue] = useState(0);

    const handleRangeSliderChange = useCallback(
        (value) => setRangeValue(value),
        [],
    );

    const handleSubmit = async () => {
        let res = await axios.post('https://lil-shopify.herokuapp.com/api/script',
            {
                name,
                startDate: selectedStartDate,
                endDate: selectedEndDate,
                position: value,
                sticky: checked,
                backGroundColor: bgColor,
                borderSize: rangeValue,
                borderColor,
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
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", padding: '10px', borderRadius: "10px", border: "1px solid black"}}>
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
                    <Card title={'Banner name:'} sectioned>
                        <TextField
                            label={'Name'}
                            value={name}
                            onChange={(value) => {
                                setName(value)
                            }}
                            error={(!name) ? 'Please enter name' : ''}
                        />
                    </Card>
                    <Card title={'Start time'} sectioned>
                        <DatePicker
                            month={month}
                            year={year}
                            onChange={setSelectedStartDate}
                            onMonthChange={handleMonthChange}
                            selected={selectedStartDate}
                        />
                    </Card>
                    <Card title={'End Time'} sectioned>
                        <DatePicker
                            month={endMonth}
                            year={endYear}
                            onChange={setSelectedEndDate}
                            onMonthChange={handleEndMonthChange}
                            selected={selectedEndDate}
                            size={'slim'}
                        />
                    </Card>
                    <Card title={'Timer display'} sectioned>
                        <Stack vertical>
                            <RadioButton
                                label="Top"
                                helpText="Displays timer at the top of the store."
                                checked={value === 'Top'}
                                id={'Top'}
                                name="Top"
                                onChange={handleChange}
                            />
                            <RadioButton
                                label="Bottom"
                                helpText="Displays timer at the bottom of the store."
                                id="Bottom"
                                name="Bottom"
                                checked={value === 'Bottom'}
                                onChange={handleChange}
                            />
                        </Stack>
                        <Checkbox
                            label="Display sticky"
                            checked={checked}
                            onChange={(newChecked) => {
                                setChecked(newChecked)
                            }}
                        />
                    </Card>
                    <Card title={'Timer design'} sectioned>
                        <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                            <div>
                                <p style={{marginBottom: '10px'}}>Background color:</p>

                                <Popover active={popoverActive} activator={activator} onClose={togglePopoverActive}
                                         fluidContent={true} sectioned>
                                    <ColorPicker color={bgColor} onChange={setBgColor}/>
                                </Popover>
                                <div style={{
                                    width: '100%',
                                    height: '40px',
                                    borderRadius: '5px',
                                    backgroundColor: `hsla(${bgColor.hue}, ${bgColor.saturation * 100}%, ${bgColor.brightness * 100}%, ${bgColor.alpha})`,
                                    marginTop: '10px'
                                }}/>
                            </div>
                            <div>
                                <RangeSlider
                                    label="Border size:"
                                    value={rangeValue}
                                    onChange={handleRangeSliderChange}
                                    min={0}
                                    max={12}
                                    output
                                />
                            </div>
                            <div>
                                <p style={{marginBottom: '10px'}}>Border color:</p>

                                <Popover active={borderPopover} activator={borderActivator}
                                         onClose={toggleBorderPopover}
                                         fluidContent={true} sectioned>
                                    <ColorPicker color={borderColor} onChange={setBorderColor}/>
                                </Popover>
                                <div style={{
                                    width: '100%',
                                    height: '40px',
                                    borderRadius: '5px',
                                    backgroundColor: `hsla(${borderColor.hue}, ${borderColor.saturation * 100}%, ${borderColor.brightness * 100}%, ${borderColor.alpha})`,
                                    marginTop: '10px'
                                }}/>
                            </div>
                        </div>
                    </Card>
                    <div style={{marginTop: '25px'}}>
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
