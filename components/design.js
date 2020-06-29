import {Card, ColorPicker, Layout, Popover, RangeSlider, TextField} from "@shopify/polaris";


const DesignSection = (props) => {
    return(
        <Layout.Section>
            <Card title={'Timer design'} sectioned>
                <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
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
                <TextField
                    label={'Second text'}
                    value={props.secondText}
                    onChange={(value) => {
                        props.setSecondText(value)
                    }}
                    error={(!props.secondText) ? 'Please enter text' : ''}
                />
            </Card>
        </Layout.Section>
    )
};

export default DesignSection