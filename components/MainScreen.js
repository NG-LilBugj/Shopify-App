import {Button, Card, DisplayText, Layout, Page} from "@shopify/polaris";
import DisplayedConfig from "./DisplayedConfig";
import {connect} from "react-redux";
import {useEffect} from "react";
import {withStyles} from "@material-ui/core";
import {ShopifyButton} from "../utils/ShopifyButton";

const noCardDisplayStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "15vh"
};

const MainScreen = (props) => {

    let countdownTimers = props.configs.countdownConfig.script.map(s => <DisplayedConfig {...s}/>);
    let saleBanners = props.configs.saleConfig.script.map(s => <DisplayedConfig {...s}/>);
    let giftPopups = props.configs.popupConfig.script.map(s => <DisplayedConfig {...s}/>);

    useEffect(() => {
        console.log(props.configs.countdownConfig.script)
    }, []);

    return (
        <Page>
            <Layout>
                <div style={{marginBottom: '30px', marginTop: '30px', marginLeft: '2rem', width: '100%'}}>
                    <DisplayText size={'large'} element={'h1'}>
                        {props.strings.secondPageMainSign}
                    </DisplayText>
                </div>
                <Layout.Section>
                    <Card title={props.configStrings.existingCountdownTimer} sectioned>
                        {countdownTimers}
                        {!countdownTimers[0] ?
                            <div style={noCardDisplayStyle}>
                                <i>
                                    {props.strings.hereIsNo}
                                </i>
                                <ShopifyButton
                                    variant="contained"
                                    color="primary"
                                    size={"large"}
                                >
                                    {props.strings.createBanner}
                                </ShopifyButton>
                            </div> :
                            <div style={{display: "flex", justifyContent: "flex-end", width: '100%', paddingRight: '10px'}}>
                                <Button
                                    primary
                                >
                                    {props.strings.createNew}
                                </Button>
                            </div>}
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Card title={props.configStrings.existingBadgeBanner} sectioned>
                        {saleBanners}
                        {!saleBanners[0] ?
                            <div style={noCardDisplayStyle}>
                                <i>
                                    {props.strings.hereIsNo}
                                </i>
                                <ShopifyButton
                                    variant="contained"
                                    color="primary"
                                    size={"large"}
                                >
                                    {props.strings.createBanner}
                                </ShopifyButton>
                            </div> :
                            <div style={{display: "flex", justifyContent: "flex-end", width: '100%', paddingRight: '10px'}}>
                                <Button
                                    primary
                                >
                                    {props.strings.createNew}
                                </Button>
                            </div>}
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Card title={props.configStrings.existingAnimationPopup} sectioned>
                        {giftPopups}
                        {!giftPopups[0] ?
                            <div style={noCardDisplayStyle}>
                                <i>
                                    {props.strings.hereIsNo}
                                </i>
                                <ShopifyButton
                                    variant="contained"
                                    color="primary"
                                    size={"large"}
                                >
                                    {props.strings.createBanner}
                                </ShopifyButton>
                            </div> :
                            <div style={{display: "flex", justifyContent: "flex-end", width: '100%', paddingRight: '10px'}}>
                                <Button
                                    primary
                                >
                                    {props.strings.createNew}
                                </Button>
                            </div>}
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    )
};

let mapStateToProps = (state) => ({
    strings: state.localesReducer.stringsToDisplay.strings.mainScreen,
    configStrings: state.localesReducer.stringsToDisplay.strings.existing_config,
    configs: state.configsReducer
});

export default connect(mapStateToProps)(MainScreen)