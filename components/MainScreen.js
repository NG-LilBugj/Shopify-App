import {Button, Card, DisplayText, Icon, Layout, Page} from "@shopify/polaris";
import DisplayedConfig from "./DisplayedConfig";

const MainScreen = (props) => {

    let countdownTimers = props.bannerData[2].script.map(s => <DisplayedConfig {...s}/>);
    let saleBanners = props.bannerData[1].script.map(s => <DisplayedConfig {...s}/>);
    let giftPopups = props.bannerData[0].script.map(s => <DisplayedConfig {...s}/>);

    return(
        <Page>
            <Layout>
                <div style={{marginBottom: '60px', marginTop: '30px'}}>
                    <DisplayText size={'large'} element={'h1'}>
                        {props.strings.secondPageMainSign}
                    </DisplayText>
                </div>
                <Layout.Section>
                    <Card title={props.configStrings.existingCountdownTimer} sectioned>
                        {countdownTimers}
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Card title={props.configStrings.existingBadgeBanner} sectioned>
                        {saleBanners}
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Card title={props.configStrings.existingAnimationPopup} sectioned>
                        {giftPopups}
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    )
};

let mapStateToProps = (state) => ({
    strings: state.localesReducer.stringsToDisplay.strings.mainScreen,
});

export default MainScreen