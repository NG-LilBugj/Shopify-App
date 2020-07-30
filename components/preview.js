import {Card} from "@shopify/polaris";
import {connect} from "react-redux";

const Preview = (props) => {
    return(
        <Card title={props.strings.bannerPreview} sectioned>
            <div style={{display: "flex", justifyContent: "center", width: '100%'}}>
            <div style={{
                width: props.isWidget ? '70%' : '100%',
                height: props.isWidget ? (+props.heightValue * 1.5) : +props.heightValue,
                backgroundColor: `hsla(${props.decodeColors(props.bgColor)})`,
                border: `${props.rangeValue}px solid hsla(${props.decodeColors(props.borderColor)})`,
                borderRadius: props.isWidget ? '20px' : '0',
                color: 'rgb(65, 65, 106)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                alignSelf: 'center',
                textAlign: 'between',
                fontWeight: '700',
                fontSize: '24px'
            }}>
                <div className={props.isWidget? 'main-widget-container' : 'main-container'}>
                    <div style={props.isWidget ? {width: 'auto', fontSize: '24px'} : {}} className='first-sign'>{props.firstText || 'Hurry Up!'}</div>
                    <div className='inner-container'>
                        <div className="countdown-number">
                            <div className='numbers-container'>
                                <div className='number-place'><span className="days-countdown-time-first\">1</span>
                                </div>
                                <div className='number-place'><span className="days-countdown-time-second\">1</span>
                                </div>
                            </div>
                            <span className="countdown-text">{props.strings.days}</span>
                        </div>
                        <div className="countdown-number">
                            <div className='numbers-container'>
                                <div className='number-place'><span className="hours-countdown-time-first">2</span>
                                </div>
                                <div className='number-place'><span className="hours-countdown-time-second">2</span>
                                </div>
                            </div>
                            <span className="countdown-text">{props.strings.hours}</span>
                        </div>
                        <span className='delimiter'>:</span>
                        <div className="countdown-number">
                            <div className='numbers-container'>
                                <div className='number-place'><span
                                    className="minutes-countdown-time-first">3</span>
                                </div>
                                <div className='number-place'><span
                                    className="minutes-countdown-time-second">3</span>
                                </div>
                            </div>
                            <span className="countdown-text">{props.strings.minutes}</span>
                        </div>
                        <span className='delimiter'>:</span>
                        <div className="countdown-number">
                            <div className='numbers-container'>
                                <div className='number-place'><span
                                    className="seconds-countdown-time-first">4</span>
                                </div>
                                <div className='number-place'><span
                                    className="seconds-countdown-time-second">4</span>
                                </div>
                            </div>
                            <span className="countdown-text">{props.strings.seconds}</span>
                        </div>
                    </div>
                    <div style={props.isWidget ? {width: 'auto', fontSize: '18px'} : {}} className='last-sign'>{props.secondText || 'Flash Sale!'}</div>
                </div>
                {props.isLinkActive && <a href={props.href} className={'event-link'}>{props.linkText}</a>}
            </div>
            </div>
        </Card>
    )
};

const mapStateToProps = (state) => ({
    strings: state.localesReducer.stringsToDisplay.strings.preview
});

export default connect(mapStateToProps)(Preview)