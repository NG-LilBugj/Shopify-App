import {Banner, Button, Card, DisplayText, Frame, Layout, Page, Toast} from "@shopify/polaris";
import DisplayedConfig from "./DisplayedConfig";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {ShopifyButton} from "../utils/ShopifyButton";
import Link from "next/link";
import {setCountdownId, setPopupId, setSaleId} from "../redux/configsReducer";
import LocalesToggler from "./localesToggler";

const noCardDisplayStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "15vh"
};
const delimiter = {
    width: '100%',
    height: '15px'
};

const MainScreen = (props) => {

    const [isToast, toggleToast] = useState(false);

    let countdownTimers = props.configs.countdownConfig.script.map(s => <DisplayedConfig {...s} toggleToast={toggleToast}/>);
    let saleBanners = props.configs.saleConfig.script.map(s => <DisplayedConfig {...s} toggleToast={toggleToast}/>);
    let giftPopups = props.configs.popupConfig.script.map(s => <DisplayedConfig {...s} toggleToast={toggleToast}/>);

    useEffect(() => {
        console.log(props.configs)
    }, []);

    return (
        <Frame>
        <Page>
            {isToast && <Toast content={props.strings.toastMessage} onDismiss={() => toggleToast(false)}/>}
            <Layout>
                <div style={{display: "flex", justifyContent: "flex-end", width: '100%'}}>
                    <LocalesToggler/>
                </div>
                <div style={{marginBottom: '30px', marginTop: '30px', marginLeft: '2rem', width: '100%'}}>
                    <DisplayText size={'large'} element={'h1'}>
                        {props.strings.secondPageMainSign}
                    </DisplayText>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '2rem', width: '100%'}}>
                    <Banner
                        title={props.strings.dearMerchant}
                        status={"success"}
                    >
                        <p style={{maxWidth: '100vw', marginBottom: '15px'}}>
                            {props.strings.pleaseWrite}
                        </p>
                        <a href={"https://apps.shopify.com/sale-banner"} target={"blank"} style={{textDecoration: 'none'}}>
                            <Button
                                outline
                            >
                                App store page
                            </Button>
                        </a>
                    </Banner>
                </div>
                <Layout.Section>
                    <Card title={props.configStrings.existingCountdownTimer}>
                        <div style={delimiter}/>
                        {countdownTimers}
                        {!countdownTimers[0] ?
                            <div style={noCardDisplayStyle}>
                                <i>
                                    {props.strings.hereIsNo}
                                </i>
                                <Link href={'/countdown'}>
                                    <ShopifyButton
                                        variant="contained"
                                        color="primary"
                                        size={"large"}
                                    >
                                        {props.strings.createBanner}
                                    </ShopifyButton>
                                </Link>
                            </div> :
                            <div style={{display: "flex", justifyContent: "flex-end", width: '100%', padding: '2rem'}}>
                                <Link href={'/countdown'}>
                                <Button
                                    primary
                                    onClick={() => props.setCountdownId(0)}
                                    disabled={props.configs.countdownConfig.script.map(s => s.configData.display).includes('all')}
                                >
                                    {props.strings.createNew}
                                </Button>
                                </Link>
                            </div>}
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Card title={props.configStrings.existingBadgeBanner}>
                        <div style={delimiter}/>
                        {saleBanners}
                        {!saleBanners[0] ?
                            <div style={noCardDisplayStyle}>
                                <i>
                                    {props.strings.hereIsNo}
                                </i>
                                <Link href={'/badges'}>
                                    <ShopifyButton
                                        variant="contained"
                                        color="primary"
                                        size={"large"}
                                    >
                                        {props.strings.createBanner}
                                    </ShopifyButton>
                                </Link>
                            </div> :
                            <div style={{display: "flex", justifyContent: "flex-end", width: '100%', padding: '2rem'}}>
                                <Link href={'/badges'}>
                                    <Button
                                        primary
                                        onClick={() => props.setSaleId(0)}
                                        disabled={props.configs.saleConfig.script.map(s => s.configData.isAllProducts).includes(true)}
                                    >
                                        {props.strings.createNew}
                                    </Button>
                                </Link>
                            </div>}
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Card title={props.configStrings.existingAnimationPopup}>
                        <div style={delimiter}/>
                        {giftPopups}
                        {!giftPopups[0] ?
                            <div style={noCardDisplayStyle}>
                                <i>
                                    {props.strings.hereIsNo}
                                </i>
                                <Link href={'/animations'}>
                                    <ShopifyButton
                                        variant="contained"
                                        color="primary"
                                        size={"large"}
                                    >
                                        {props.strings.createBanner}
                                    </ShopifyButton>
                                </Link>
                            </div> :
                            <div style={{display: "flex", justifyContent: "flex-end", width: '100%', padding: '2rem'}}>
                                <Link href={'/animations'}>
                                    <Button
                                        primary
                                        onClick={() => props.setPopupId(0)}
                                        disabled={props.configs.popupConfig.script.map(s => s.configData.isAllProducts).includes(true)}
                                    >
                                        {props.strings.createNew}
                                    </Button>
                                </Link>
                            </div>}
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
        </Frame>
    )
};

let mapStateToProps = (state) => ({
    strings: state.localesReducer.stringsToDisplay.strings.mainScreen,
    configStrings: state.localesReducer.stringsToDisplay.strings.existing_config,
    configs: state.configsReducer
});

export default connect(mapStateToProps, {
    setCountdownId,
    setSaleId,
    setPopupId
})(MainScreen)