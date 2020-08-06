import {Card} from "@shopify/polaris";
import {connect} from "react-redux";

const Preview = (props) => {

    const getTimeRemaining = () => {
        let t = Date.parse(props.endDate.end) - Date.parse(props.startDate.start);
        return {
            'total': t,
            'days': Math.floor(t / (1000 * 60 * 60 * 24)),
            'hours': Math.floor((t / (1000 * 60 * 60)) % 24),
            'minutes': Math.floor((t / 1000 / 60) % 60),
            'seconds': Math.floor((t / 1000) % 60)
        };
    };

    return (
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
                    <div className={props.isWidget ? 'main-widget-container' : 'main-container'}>
                        <div style={props.isWidget ? {width: 'auto', fontSize: '24px'} : {}}
                             className='first-sign'>{props.firstText || 'Hurry Up!'}</div>
                        <div className='inner-container'>
                            <div className="countdown-number">
                                <div className='numbers-container'>
                                    <div className='number-place'>
                                    <span className="days-countdown-time-first\">
                                        {Math.floor(getTimeRemaining().days / 10)}
                                    </span>
                                    </div>
                                    <div className='number-place'>
                                    <span className="days-countdown-time-second\">
                                        {getTimeRemaining().days % 10}
                                    </span>
                                    </div>
                                </div>
                                <span className="countdown-text">{props.strings.days}</span>
                            </div>
                            <div className="countdown-number">
                                <div className='numbers-container'>
                                    <div className='number-place'>
                                    <span className="hours-countdown-time-first">
                                        {Math.floor(getTimeRemaining().hours / 10)}
                                    </span>
                                    </div>
                                    <div className='number-place'>
                                    <span className="hours-countdown-time-second">
                                        {getTimeRemaining().hours % 10}
                                    </span>
                                    </div>
                                </div>
                                <span className="countdown-text">{props.strings.hours}</span>
                            </div>
                            <span className='delimiter'>:</span>
                            <div className="countdown-number">
                                <div className='numbers-container'>
                                    <div className='number-place'>
                                    <span className="minutes-countdown-time-first">
                                        {Math.floor(getTimeRemaining().minutes / 10)}
                                    </span>
                                    </div>
                                    <div className='number-place'>
                                    <span className="minutes-countdown-time-second">
                                        {getTimeRemaining().minutes % 10}
                                    </span>
                                    </div>
                                </div>
                                <span className="countdown-text">{props.strings.minutes}</span>
                            </div>
                            <span className='delimiter'>:</span>
                            <div className="countdown-number">
                                <div className='numbers-container'>
                                    <div className='number-place'>
                                        <span className="seconds-countdown-time-first">
                                            {Math.floor(getTimeRemaining().seconds / 10)}
                                        </span>
                                    </div>
                                    <div className='number-place'>
                                        <span className="seconds-countdown-time-second">
                                            {getTimeRemaining().seconds % 10}
                                        </span>
                                    </div>
                                </div>
                                <span className="countdown-text">{props.strings.seconds}</span>
                            </div>
                        </div>
                        <div style={props.isWidget ? {width: 'auto', fontSize: '18px'} : {}}
                             className='last-sign'>{props.secondText || 'Flash Sale!'}</div>
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