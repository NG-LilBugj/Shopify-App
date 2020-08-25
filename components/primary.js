import {
    Autocomplete,
    Button, ButtonGroup,
    Card,
    Checkbox,
    DatePicker, Heading, Icon,
    Layout,
    Popover,
    RadioButton, Select,
    Stack, TextContainer,
    TextField, Thumbnail
} from "@shopify/polaris";
import {ResourcePicker} from "@shopify/app-bridge-react";
import {useCallback, useEffect, useState} from "react";
import Product from "./product";
import {SearchMinor} from "@shopify/polaris-icons";
import Collection from "./collection";

const PrimaryDesign = (props) => {

    const [isProductsOpen, setProducts] = useState(false);
    const [renderProduct, setProductRender] = useState(false);

    const [isCollectionsOpen, setCollections] = useState(false);

    const [inputSearchValue, updateSearchText] = useState('');

    const handleSearchFieldChange = useCallback(
        (value) => {
            if (!props.isAllProducts || !props.isAllCollection) {
                updateSearchText(value);
                setProducts(true)
            }
        }, []
    );

    const handleProductsSelection = (resources) => {
        props.pickProducts(resources.selection.map(p => ({title: p.title, photo: p.images[0].originalSrc, id: p.handle})));
        //const idsFromResources = resources.selection.map((products) => products.handle);
        setProducts(false);
        console.log(resources.selection)
    };

    const handleCollectionsSelection = (resources) => {
        props.pickCollections(resources.selection.map(c => ({title: c.title, id: c.handle})));
        setCollections(false);
    };

    const searchField = (
        <Autocomplete.TextField
            onChange={handleSearchFieldChange}
            value={inputSearchValue}
            prefix={<Icon source={SearchMinor} color="inkLighter" />}
            placeholder="Search"
        />
    );

    useEffect(() => {
        console.log(props)
    }, [props.isAllProducts]);

    return(
        <>
            {(props.renderValue === 'collections' || props.renderValue === 'products' || props.isWidget) && <ResourcePicker
                    allowMultiple
                    resourceType={(props.renderValue === 'collections') ? "Collection" : "Product"}
                    open={(props.renderValue === 'collections') ? isCollectionsOpen : isProductsOpen}
                    onSelection={(props.renderValue === 'collections') ?
                        (resources) => handleCollectionsSelection(resources) :
                        (resources) => handleProductsSelection(resources)}
                    onCancel={(props.renderValue === 'collections') ?
                        () => setCollections(false) :
                        () => setProducts(false)}
                />}
            <Card title={props.strings.bannerName} sectioned>
                <TextField
                    label={''}
                    onBlur={props.handleNameError}
                    value={props.name}
                    placeholder={props.strings.enterName}
                    onChange={(value) => {
                        props.setName(value)
                    }}
                    error={((!props.name) && props.switchTouch) ? props.strings.pleaseEnterName : ''}
                />
            </Card>
            <Card title={props.strings.startDate} sectioned>
                <Popover active={props.startDatePopover} activator={props.startDateText} onClose={props.toggleStartPopover}
                         fluidContent={true} sectioned>
                    <DatePicker
                        month={props.month}
                        year={props.year}
                        onChange={props.setSelectedStartDate}
                        onMonthChange={props.handleMonthChange}
                        selected={props.selectedStartDate}
                    />
                    <div style={{display: "flex", justifyContent: "center", width: '100%', margin: '5px'}}>
                    <Button
                        onClick={props.toggleStartPopover}
                    >
                        OK
                    </Button>
                    </div>
                </Popover>
            </Card>
            <Card title={props.strings.endDate} sectioned>
                <Popover active={props.endDatePopover} activator={props.endDateText} onClose={props.toggleEndPopover}
                         fluidContent={true} sectioned>
                    <DatePicker
                        month={props.endMonth}
                        year={props.endYear}
                        onChange={props.setSelectedEndDate}
                        onMonthChange={props.handleEndMonthChange}
                        selected={props.selectedEndDate}
                    />
                    <div style={{display: "flex", justifyContent: "center", width: '100%', margin: '5px'}}>
                    <Button
                        onClick={props.toggleEndPopover}
                    >
                        OK
                    </Button>
                    </div>
                </Popover>
            </Card>
            <Card title={props.strings.timerDisplay} sectioned>
                <Stack vertical>
                    <ButtonGroup segmented>
                        <div style={{color: '#3333cc'}}>
                            <Button
                                primary
                                outline={props.isWidget}
                                monochrome={props.isWidget}
                                onClick={() => {
                                    props.setIsWidget(false);
                                }}
                            >
                                {props.strings.banner}
                            </Button>
                        </div>
                        <div style={{color: '#3333cc'}}>
                        <Button
                            primary
                            outline={!props.isWidget}
                            monochrome={!props.isWidget}
                            onClick={() => {
                                props.handleRenderValueChange('product');
                                props.setBorderColor({
                                    hue: 208, saturation: 1, brightness: 0.42, alpha: 1
                                });
                                props.handleRangeSliderChange(1);
                                props.setIsWidget(true)
                            }}
                        >
                            {props.strings.widget}
                        </Button>
                        </div>
                    </ButtonGroup>
                </Stack>
                {!props.isWidget ? <>
                <Stack vertical>
                    <Heading>
                        {props.strings.timerPosition}
                    </Heading>
                    <RadioButton
                        label={props.strings.top}
                        helpText={props.strings.displaysTimerTop}
                        checked={props.value === 'Top'}
                        id={'Top'}
                        name="Top"
                        onChange={props.handleChange}
                    />
                    <RadioButton
                        label={props.strings.bottom}
                        helpText={props.strings.displaysTimerBottom}
                        id="Bottom"
                        name="Bottom"
                        checked={props.value === 'Bottom'}
                        onChange={props.handleChange}
                    />
                </Stack>
                <div style={{marginTop: '15px', marginBottom: '15px'}}>
                <Checkbox
                    label={props.strings.displaySticky}
                    checked={props.checked}
                    onChange={(newChecked) => {
                        props.setChecked(newChecked)
                    }}
                />
                </div>
                <Stack vertical>
                    <Heading>
                        {props.strings.pagesShown}
                    </Heading>
                    <RadioButton
                        label={props.strings.all}
                        helpText={props.strings.displayAtAll}
                        checked={props.renderValue === 'all'}
                        id={'all'}
                        name="all"
                        onChange={props.handleRenderValueChange}
                    />
                    <RadioButton
                        label={props.strings.products}
                        helpText={props.strings.displayAtProducts}
                        id="products"
                        name="products"
                        checked={props.renderValue === 'products'}
                        onChange={props.handleRenderValueChange}
                    />
                    {(props.renderValue === 'products') && <Stack vertical>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' ,width: '520px'}}>
                            <Autocomplete
                                onSelect={(value) => console.log(value)}
                                selected={[]}
                                options={[]}
                                textField={searchField}
                            />
                            <Button
                                size={"small"}
                                type={"submit"}
                                disabled={props.isAllProducts}
                                onClick={() => setProducts(true)}
                            >
                                {props.strings.browseProducts}
                            </Button>
                            <Button
                                plain
                                onClick={() => {console.log('pressed'); props.pickAllProducts(!props.isAllProducts)}}
                            >
                                {props.isAllProducts ? props.strings.cancel : props.strings.pickAllProducts}
                            </Button>
                        </div>
                        {(props.products.length) && props.products.map(p => <Product pickProducts={props.pickProducts}
                                                                                     products={props.products} {...p}/>)}
                        {console.log(props.products)}
                    </Stack>}
                    <RadioButton
                        label={props.strings.collections}
                        helpText={props.strings.displayAtCollections}
                        id="collections"
                        name="collections"
                        checked={props.renderValue === 'collections'}
                        onChange={props.handleRenderValueChange}
                    />
                    {(props.renderValue === 'collections') && <Stack vertical>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '520px'}}>
                            <Autocomplete
                                onSelect={(value) => console.log(value)}
                                selected={[]}
                                options={[]}
                                textField={searchField}
                            />
                            <Button
                                size={"small"}
                                type={"submit"}
                                disabled={props.isAllCollection}
                                onClick={() => setCollections(true)}
                            >
                                {props.strings.browseCollections}
                            </Button>
                            <Button
                                plain
                                onClick={() => props.pickAllCollection(!props.isAllCollection)}
                            >
                                {props.isAllCollection ? props.strings.cancel : props.strings.pickAllCollections}
                            </Button>
                        </div>
                        {(props.collections.length) && props.collections.map(c => <Collection pickCollections={props.pickCollections}
                                                                                     collections={props.collections} {...c}/>)}
                        {console.log(props.products)}
                    </Stack>}
                </Stack>
                </>
                : <Stack vertical>
                        <div style={{marginTop: '15px'}}>
                        <TextContainer>
                        <Heading>
                            {props.widget.widgetDescription}
                        </Heading>
                            <i style={{width: '240px', marginTop: '10px'}}>
                                {props.strings.widgetDescriptionText}
                            </i>
                        </TextContainer>
                        </div>
                        <div>
                            <Heading>
                                {props.strings.widgetPlacement}
                            </Heading>
                            <div style={{width: '240px'}}>
                            <Select
                                label={''}
                                labelInline
                                options={[
                                    {label: props.strings.aboveTitle, value: '.product-single__title/prepend'},
                                    {label: props.strings.belowTitle, value: '.product-single__title/append'},
                                    {label: props.strings.abovePrice, value: '.product__price/prepend'},
                                    {label: props.strings.belowPrice, value: '.product__price/append'},
                                    {label: props.strings.aboveBuyButton, value: '.product-form__controls-group/append'},
                                    {label: props.strings.belowBuyButton, value: '.product-form__controls-group product-form__controls-group--submit/append'},
                                ]}
                                onChange={(value) => props.setWidgetValue(value)}
                                value={props.widgetRenderValue}
                            />
                            </div>
                        </div>
                        <Heading>
                            {props.strings.productPagesWithTimer}
                        </Heading>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' ,width: '520px'}}>
                    <Autocomplete
                    onSelect={(value) => console.log(value)}
                    selected={[]}
                    options={[]}
                    textField={searchField}
                    />
                    <Button
                    size={"small"}
                    type={"submit"}
                    disabled={props.isAllProducts}
                    onClick={() => setProducts(true)}
                    >
                        {props.strings.browseProducts}
                    </Button>
                        <Button
                            plain
                            onClick={() => props.pickAllProducts(true)}
                        >
                            {props.strings.pickAllProducts}
                        </Button>
                    </div>
                    {(props.products.length) && props.products.map(p => <Product pickProducts={props.pickProducts}
                                                                                 products={props.products} {...p}/>)}
                    {console.log(props.products)}
                    </Stack>}
            </Card>
            <Card title={props.strings.utils} sectioned>
                <Stack vertical>
                    <Checkbox
                        label={props.strings.repeat}
                        checked={props.isRepeatable}
                        onChange={(newChecked) => {
                            props.setRepeat(newChecked)
                        }}
                    />
                </Stack>
            </Card>
            </>
    )
};

const mapStateToProps = (state) => ({
    strings: state.localesReducer.stringsToDisplay.strings.primary
});

export default connect(mapStateToProps)(PrimaryDesign)