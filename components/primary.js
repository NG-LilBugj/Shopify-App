import {
    Autocomplete,
    Button,
    Card,
    Checkbox,
    DatePicker, Icon,
    Layout,
    Popover,
    RadioButton,
    Stack,
    TextField, Thumbnail
} from "@shopify/polaris";
import {ResourcePicker} from "@shopify/app-bridge-react";
import {useCallback, useState} from "react";
import Product from "./product";
import {SearchMinor} from "@shopify/polaris-icons";


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

    const handleSelection = (resources) => {
        props.pickProducts(resources.selection);
        //const idsFromResources = resources.selection.map((products) => products.handle);
        setProducts(false);
        console.log(resources.selection)
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
            <ResourcePicker
                resourceType="Collection"
                open={isCollectionsOpen}
                onSelection={(resources) => console.log(resources)}
                onCancel={() => setCollections(false)}
            />
            <ResourcePicker
                resourceType="Collection"
                open={isProductsOpen}
                onSelection={(resources) => handleSelection(resources)}
                onCancel={() => setProducts(false)}
            />
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
                <Checkbox
                    label="Display sticky"
                    checked={props.checked}
                    onChange={(newChecked) => {
                        props.setChecked(newChecked)
                    }}
                />
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
                        label="Store"
                        helpText="Displays timer at the pages of store."
                        id="online_store"
                        name="online_store"
                        checked={props.renderValue === 'online_store'}
                        onChange={props.handleRenderValueChange}
                    />
                    <RadioButton
                        label="Order"
                        helpText="Displays timer at the order status page."
                        id="order_status"
                        name="order_status"
                        checked={props.renderValue === 'order_status'}
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
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',width: '420px'}}>
                            <Autocomplete
                                onSelect={(value) => console.log(value)}
                                selected={[]}
                                options={[]}
                                textField={searchField}
                            />
                            <Button
                                size={"small"}
                                type={"submit"}
                                onClick={() => setProducts(true)}
                            >
                                Browse products
                            </Button>
                        </div>
                        {(props.products.length) && props.products.map(p => <Product pickProducts={props.pickProducts}
                                                                                     products={props.products} title={p.title} photo={p.images[0].originalSrc} id={p.handle}/>)}
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
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',width: '420px'}}>
                            <Autocomplete
                                onSelect={(value) => console.log(value)}
                                selected={[]}
                                options={[]}
                                textField={searchField}
                            />
                            <Button
                                size={"small"}
                                type={"submit"}
                                onClick={() => setCollections(true)}
                            >
                                Browse collections
                            </Button>
                        </div>
                        {(props.products.length) && props.products.map(p => <Product pickProducts={props.pickProducts}
                                                                                     products={props.products} title={p.title} photo={p.images[0].originalSrc} id={p.handle}/>)}
                        {console.log(props.products)}
                    </Stack>}
                </Stack>
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