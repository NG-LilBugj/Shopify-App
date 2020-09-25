import {Card, DisplayText, Heading, Layout, Page, TextStyle} from "@shopify/polaris";
import {Button, withStyles} from "@material-ui/core"
import {useEffect, useState} from "react";
import Link from "next/link";
import BannerInfo from "./BannerInfo";
import {connect} from "react-redux";
import axios from "axios";
import LocalesToggler from "./localesToggler";

const ShopifyButton = withStyles({
    root: {
        padding: '9px 18px',
        textTransform: 'none',
        fontSize: 16,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
})(Button);

const BannerVariants = (props) => {
    useEffect(() => {
        axios.get('https://lil-shopify.herokuapp.com/amplitude/main')
            .catch(e => console.log(e));
        axios.get(`https://lil-shopify.herokuapp.com/billing/check?shop=${window.location.hostname}`)
            .then(res => {
                console.log(res.data);
                setOnPlan(true)
            })
            .catch(e => console.log(e))
    }, []);

    const [isOnPlan, setOnPlan] = useState(false);

    const [chosenOption, chooseOption] = useState(1);

    return (
        <Page>
            <Layout>
                <div style={{display: "flex", justifyContent: "flex-end", width: '100%'}}>
                    <LocalesToggler/>
                </div>
                <div style={{marginBottom: '60px', marginTop: '30px'}}>
                    <DisplayText size={'large'} element={'h1'}>
                        {props.strings.secondPageMainSign}
                    </DisplayText>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    minHeight: '60vh'
                }}>
                    <Card sectioned>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: '540px',
                                cursor: "pointer",
                                height: "104px"
                            }}
                            onClick={() => chooseOption(1)}
                        >
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                {(chosenOption === 1) &&
                                <img style={{width: '32px', height: '32px'}}
                                     src={'https://lil-proxy.herokuapp.com/static/shopify_tick.png'} alt={'tick'}/>}
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    marginLeft: '20px'
                                }}>
                                    <Heading>
                                        {props.strings.countdownTimerBar}
                                    </Heading>
                                    <p style={{width: '320px'}}>
                                        {props.strings.countdownDescription}
                                    </p>
                                    <i style={{fontWeight: '300'}}>
                                        {props.strings.countdownRevenue}
                                    </i>
                                </div>
                            </div>
                            <div style={{display: "flex", alignItems: 'center'}}>
                                <img style={{width: '90px', height: '41px'}}
                                     src={'https://lil-proxy.herokuapp.com/static/day_left.png'} alt={'design'}/>
                            </div>
                        </div>
                    </Card>
                    <Card sectioned>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                maxWidth: '540px',
                                cursor: "pointer",
                                height: "104px"
                            }}
                            onClick={() => chooseOption(2)}
                        >
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {(chosenOption === 2) &&
                                <img style={{width: '32px', height: '32px'}}
                                     src={'https://lil-proxy.herokuapp.com/static/shopify_tick.png'} alt={'tick'}/>}
                                <div style={{display: "flex", flexDirection: "column", marginLeft: '20px'}}>
                                    <Heading>
                                        {props.strings.saleBanner}
                                    </Heading>
                                    <p style={{width: '320px'}}>
                                        {props.strings.saleBannerDescription}
                                    </p>
                                    <i style={{fontWeight: '300'}}>
                                        {props.strings.saleBannerRevenue}
                                    </i>
                                </div>
                            </div>
                            <div style={{display: "flex", alignItems: 'center'}}>
                                <img style={{width: '90px'}}
                                     src={'https://lil-proxy.herokuapp.com/static/flash_sale.png'} alt={'design'}/>
                            </div>
                        </div>
                    </Card>
                    <Card sectioned>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                maxWidth: '540px',
                                cursor: "pointer",
                                height: "104px"
                            }}
                            onClick={() => chooseOption(3)}
                        >
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {(chosenOption === 3) &&
                                <img style={{width: '32px', height: '32px'}}
                                     src={'https://lil-proxy.herokuapp.com/static/shopify_tick.png'} alt={'tick'}/>}
                                <div style={{display: "flex", flexDirection: "column", marginLeft: '20px'}}>
                                    <Heading>
                                        {props.strings.animationBanner}
                                    </Heading>
                                    <p style={{width: '320px'}}>
                                        {props.strings.animationDescription}
                                    </p>
                                    <i style={{fontWeight: '300'}}>
                                        {props.strings.animationRevenue}
                                    </i>
                                </div>
                            </div>
                            <img style={{width: '90px'}} src={'https://lil-proxy.herokuapp.com/static/gift.gif'}
                                 alt={'design'}/>
                        </div>
                    </Card>
                </div>
                <Layout.Section>
                    {!isOnPlan && <div style={{
                        display: "flex",
                        justifyContent: "center",
                        color: "red"
                    }}>
                        <DisplayText>
                            {props.strings.planWarning}
                        </DisplayText>
                    </div>}
                <div style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: '100%',
                    marginBottom: '10px',
                    marginTop: '40px',
                }}>
                    <Link href={(chosenOption === 1) ? '/countdown' : (chosenOption === 2) ? '/badges' : '/animations'}>
                        <ShopifyButton
                            variant="contained"
                            color="primary"
                            size={'large'}
                            disabled={!isOnPlan}
                        >
                            {props.strings.continue}
                        </ShopifyButton>
                    </Link>
                </div>
                </Layout.Section>
            </Layout>
        </Page>
    )
};

const mapStateToProps = (state) => ({
    strings: state.localesReducer.stringsToDisplay.strings.bannerVariants
});

export default connect(mapStateToProps)(BannerVariants)