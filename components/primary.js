import {
    Button,
    Card,
    Checkbox,
    DatePicker,
    Layout,
    Popover,
    RadioButton,
    ResourcePicker,
    Stack,
    TextField
} from "@shopify/polaris";
import {useState} from "react";


const PrimaryDesign = (props) => {

    const [isProductsOpen, setProducts] = useState(false);
    const [renderProduct, setProductRender] = useState(false);

    const handleSelection = (resources) => {
        const idsFromResources = resources.selection.map((product) => product.handle);
        setProducts(false);
        console.log(idsFromResources)
    };

    return(
        <>
            <ResourcePicker
                resourceType="Product"
                showVariants={false}
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
                    error={((!props.name) && props.nameError) ? 'Please enter name' : ''}
                />
            </Card>
            <Card title={'Start date'} sectioned>
                <Popover active={props.startDatePopover} activator={props.startDateText} onClose={props.toggleStartPopover}
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
                <Popover active={props.endDatePopover} activator={props.endDateText} onClose={props.toggleEndPopover}
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
                </Stack>
                <Checkbox
                    label={"Display at certain product"}
                    checked={renderProduct}
                    onChange={(newChecked) => {
                        setProductRender(newChecked)
                    }}
                    />
            </Card>
            {(renderProduct) && <Card sectioned>
                <Stack>
                   <Button
                       primary
                       size={"large"}
                       type={"submit"}
                       onClick={() => setProducts(true)}
                   >
                       Browse products
                   </Button>
                </Stack>
            </Card>}
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