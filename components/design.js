import {Card, Checkbox, ColorPicker, Layout, Popover, RangeSlider, TextField} from "@shopify/polaris";
import '../public/index.css'
import Preview from "./preview";


const DesignSection = (props) => {
    return(
        <Layout.Section>
            <Card title={'Timer design'} sectioned>
                <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', width: '100%'}}>
                    <div>
                        <p style={{marginBottom: '10px'}}>Background color:</p>

                        <Popover active={props.popoverActive} activator={props.activator} onClose={props.togglePopoverActive}
                                 fluidContent={true} sectioned>
                            <ColorPicker color={props.bgColor} onChange={props.setBgColor}/>
                        </Popover>
                        <div style={{
                            width: '100%',
                            height: '40px',
                            borderRadius: '5px',
                            backgroundColor: `hsla(${props.bgColor.hue}, ${props.bgColor.saturation * 100}%, ${props.bgColor.brightness * 100}%, ${props.bgColor.alpha})`,
                            marginTop: '10px'
                        }}/>
                    </div>
                    <div>
                        <RangeSlider
                            label="Banner height:"
                            value={props.heightValue}
                            onChange={props.handleHeightSliderChange}
                            min={60}
                            max={150}
                            output
                        />
                    </div>
                    <div>
                        <RangeSlider
                            label="Border size:"
                            value={props.rangeValue}
                            onChange={props.handleRangeSliderChange}
                            min={0}
                            max={12}
                            output
                        />
                    </div>
                    <div>
                        <p style={{marginBottom: '10px'}}>Border color:</p>

                        <Popover active={props.borderPopover} activator={props.borderActivator}
                                 onClose={props.toggleBorderPopover}
                                 fluidContent={true} sectioned>
                            <ColorPicker color={props.borderColor} onChange={props.setBorderColor}/>
                        </Popover>
                        <div style={{
                            width: '100%',
                            height: '40px',
                            borderRadius: '5px',
                            backgroundColor: `hsla(${props.borderColor.hue}, ${props.borderColor.saturation * 100}%, ${props.borderColor.brightness * 100}%, ${props.borderColor.alpha})`,
                            marginTop: '10px'
                        }}/>
                    </div>
                </div>
            </Card>
            <Card title={'Banner texts:'} sectioned>
                <TextField
                    label={'First text'}
                    value={props.firstText}
                    onChange={(value) => {
                        props.setFirstText(value)
                    }}
                    error={(!props.firstText) ? 'Please enter text' : ''}
                />
                <div style={{marginTop: '25px'}}>
                    <TextField
                    label={'Second text'}
                    value={props.secondText}
                    onChange={(value) => {
                        props.setSecondText(value)
                    }}
                    error={(!props.secondText) ? 'Please enter text' : ''}
                />
                </div>
            </Card>
            <Card sectioned>
                <Checkbox
                    label={'Discount link'}
                    checked={props.isLinkActive}
                    onChange={(newChecked) => {
                        props.activateLink(newChecked)
                    }}
                />
                {props.isLinkActive && <div style={{display: 'flex', flexDirection: 'row', height: '60px'}}>
                <TextField
                    label={'Title:'}
                    value={props.linkText}
                    onChange={(value) => {
                        props.setLinkText(value)
                    }}
                    error={(!props.linkText) ? 'Please enter text' : ''}
                />
                <TextField
                    label={'Link:'}
                    value={props.href}
                    onChange={(value) => {
                        props.setHref(value)
                    }}
                    error={(!props.href) ? 'Please enter text' : ''}
                />
                </div>}
            </Card>
            <Preview
                decodeColors={decodeColors} {...props}
            />
        </Layout.Section>
    )
};

const decodeColors = (model) => {
    let {hue, saturation, brightness, alpha} = model;
    return `${hue}, ${saturation*100}%, ${brightness*100}%, ${alpha}`
};

export default DesignSection