import {
    Autocomplete,
    Button, ButtonGroup,
    Card,
    Checkbox,
    DatePicker, Heading, Icon,
    Layout,
    Popover,
    RadioButton,
    Stack, TextContainer,
    TextField, Thumbnail
} from "@shopify/polaris";
import {ResourcePicker} from "@shopify/app-bridge-react";
import {useCallback, useState} from "react";
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
            updateSearchText(value);
            setProducts(true)
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
            label="Products"
            value={inputSearchValue}
            prefix={<Icon source={SearchMinor} color="inkLighter" />}
            placeholder="Search"
        />
    );

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
                </Popover>
            </Card>
            <Card title={'Timer display'} sectioned>
                <Stack vertical>
                    <ButtonGroup segmented>
                        <div style={{color: '3333cc'}}>
                            <Button
                                outline={!props.isWidget}
                                monochrome={!props.isWidget}
                                onClick={() => {
                                    props.setIsWidget(false);
                                }}
                            >
                                Banner
                            </Button>
                        </div>
                        <Button
                            outline={props.isWidget}
                            monochrome={props.isWidget}
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
                    </ButtonGroup>
                </Stack>
                {!props.isWidget ? <>
                <Stack vertical>
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
                <div style={{marginTop: '10px', marginBottom: '10px'}}>
                <Checkbox
                    label="Display sticky"
                    checked={props.checked}
                    onChange={(newChecked) => {
                        props.setChecked(newChecked)
                    }}
                />
                </div>
                <Stack vertical>
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
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' ,width: '420px'}}>
                            <Autocomplete
                                onSelect={(value) => console.log(value)}
                                selected={[]}
                                options={[]}
                                textField={searchField}
                            />
                            <div style={{height: '35px'}}>
                            <Button
                                size={"small"}
                                type={"submit"}
                                onClick={() => setProducts(true)}
                            >
                                Browse products
                            </Button>
                            </div>
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
                            <div style={{height: '35px'}}>
                            <Button
                                size={"small"}
                                type={"submit"}
                                onClick={() => setCollections(true)}
                            >
                                Browse collections
                            </Button>
                            </div>
                        </div>
                        {(props.collections.length) && props.collections.map(c => <Collection pickCollections={props.pickCollections}
                                                                                     collections={props.collections} {...c}/>)}
                        {console.log(props.products)}
                    </Stack>}
                </Stack>
                </>
                : <Stack vertical>
                        <TextContainer>
                        <Heading>
                            Widget description
                        </Heading>
                            <i>
                                Compact timer, available on product pages only. Renders beneath product description
                            </i>
                        </TextContainer>
                        <Heading>
                            Product pages with timer
                        </Heading>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' ,width: '420px'}}>
                    <Autocomplete
                    onSelect={(value) => console.log(value)}
                    selected={[]}
                    options={[]}
                    textField={searchField}
                    />
                    <div style={{height: '35px'}}>
                    <Button
                    size={"small"}
                    type={"submit"}
                    onClick={() => setProducts(true)}
                    >
                    Browse products
                    </Button>
                    </div>
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