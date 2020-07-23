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
            <Card title={'Banner name:'} sectioned>
                <TextField
                    label={''}
                    onBlur={props.handleNameError}
                    value={props.name}
                    placeholder={'Enter name...'}
                    onChange={(value) => {
                        props.setName(value)
                    }}
                    error={((!props.name) && props.switchTouch) ? 'Please enter name' : ''}
                />
            </Card>
            <Card title={'Start date'} sectioned>
                <Popover active={props.startDatePopover} activator={props.startDateText} onClose={props.dateCheck}
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
                        primary
                        onClick={props.toggleStartPopover}
                    >
                        OK
                    </Button>
                    </div>
                </Popover>
            </Card>
            <Card title={'End date'} sectioned>
                <Popover active={props.endDatePopover} activator={props.endDateText} onClose={props.dateCheck}
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
            <Card title={'Timer display'} sectioned>
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
                                Banner
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
                            Widget
                        </Button>
                        </div>
                    </ButtonGroup>
                </Stack>
                {!props.isWidget ? <>
                <Stack vertical>
                    <Heading>
                        Timer position at the page
                    </Heading>
                    <RadioButton
                        label="Top"
                        helpText="Displays timer at the top of the store."
                        checked={props.value === 'Top'}
                        id={'Top'}
                        name="Top"
                        onChange={props.handleChange}
                    />
                    <RadioButton
                        label="Bottom"
                        helpText="Displays timer at the bottom of the store."
                        id="Bottom"
                        name="Bottom"
                        checked={props.value === 'Bottom'}
                        onChange={props.handleChange}
                    />
                </Stack>
                <div style={{marginTop: '15px', marginBottom: '15px'}}>
                <Checkbox
                    label="Display sticky"
                    checked={props.checked}
                    onChange={(newChecked) => {
                        props.setChecked(newChecked)
                    }}
                />
                </div>
                <Stack vertical>
                    <Heading>
                        Pages where timer is shown
                    </Heading>
                    <RadioButton
                        label="All"
                        helpText="Displays timer at all pages."
                        checked={props.renderValue === 'all'}
                        id={'all'}
                        name="all"
                        onChange={props.handleRenderValueChange}
                    />
                    <RadioButton
                        label="Products"
                        helpText="Displays timer at certain product pages."
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
                                Browse products
                            </Button>
                            <Button
                                primary
                                onCLick={() => {console.log('pressed'); props.pickAllProducts(!props.isAllProducts)}}
                            >
                                {props.isAllProducts ? 'Cancel' : 'Pick All Products'}
                            </Button>
                        </div>
                        {(props.products.length) && props.products.map(p => <Product pickProducts={props.pickProducts}
                                                                                     products={props.products} {...p}/>)}
                        {console.log(props.products)}
                    </Stack>}
                    <RadioButton
                        label="Collections"
                        helpText="Displays timer at certain collection pages."
                        id="collections"
                        name="collections"
                        checked={props.renderValue === 'collections'}
                        onChange={props.handleRenderValueChange}
                    />
                    {(props.renderValue === 'collections') && <Stack vertical>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '420px'}}>
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
                                Browse collections
                            </Button>
                            <Button
                                plain
                                onCLick={() => props.pickAllCollection(true)}
                            >
                                Pick All Collections
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
                            Widget description
                        </Heading>
                            <i style={{width: '240px', marginTop: '10px'}}>
                                Compact timer, available on product pages only. Renders beneath product title
                            </i>
                        </TextContainer>
                        </div>
                        <div>
                            <Heading>
                                Widget placement
                            </Heading>
                            <div style={{width: '240px'}}>
                            <Select
                                label={''}
                                labelInline
                                options={[
                                    {label: 'Above title', value: '.product-single__title/prepend'},
                                    {label: 'Below title', value: '.product-single__title/append'},
                                    {label: 'Above price', value: '.product__price/prepend'},
                                    {label: 'Below price', value: '.product__price/append'},
                                    {label: 'Above buy button', value: '.product-form__controls-group/append'},
                                    {label: 'Below buy button', value: '.product-form__controls-group product-form__controls-group--submit/append'},
                                ]}
                                onChange={(value) => props.setWidgetValue(value)}
                                value={props.widgetRenderValue}
                            />
                            </div>
                        </div>
                        <Heading>
                            Product pages with timer
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
                    Browse products
                    </Button>
                        <Button
                            plain
                            onCLick={() => props.pickAllProducts(true)}
                        >
                            Pick All Products
                        </Button>
                    </div>
                    {(props.products.length) && props.products.map(p => <Product pickProducts={props.pickProducts}
                                                                                 products={props.products} {...p}/>)}
                    {console.log(props.products)}
                    </Stack>}
            </Card>
            <Card title={'Utils'} sectioned>
                <Stack vertical>
                    <Checkbox
                        label="Repeat timer when it ends"
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

export default PrimaryDesign