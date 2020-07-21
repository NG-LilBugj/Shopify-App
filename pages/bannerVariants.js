import {Card, DisplayText, Heading, Layout, Page} from "@shopify/polaris";
import {Button, withStyles} from "@material-ui/core"
import {useState} from "react";

const ShopifyButton = withStyles({
    root: {
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

    const [chosenOption, chooseOption] = useState(1);

    return(
        <Page>
            <Layout>
                <div style={{marginBottom: '60px', marginTop: '30px'}}>
                <DisplayText size={'large'} element={'h1'}>
                    Which wat do you want to encreasy revenue?
                </DisplayText>
                </div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around", height: '60vh'}}>
                    <Layout.Section>
                        <Card sectioned>
                            <div
                                style={{display: "flex", justifyContent: "space-between", width: '100%'}}
                                onClick={() => chooseOption(1)}
                            >
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    {(chosenOption === 1) &&
                                        <img style={{width: '32px', height: '32px'}} src={'https://lil-proxy.herokuapp.com/static/shopify_tick.png'} alt={'tick'}/>}
                                <div style={{display: "flex", flexDirection: "column", marginLeft: '20px'}}>
                        <Heading>
                            Banner first
                        </Heading>
                        <p>
                            Special countdown timer which can render on product or other pages, signs that great offer has begun!
                        </p>
                                </div>
                                </div>
                                <img style={{width: '120px'}} src={'https://lil-proxy.herokuapp.com/static/day_left.png'} alt={'design'}/>
                            </div>
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <Card sectioned>
                            <div
                                style={{display: "flex", justifyContent: "space-between", width: '100%'}}
                                onClick={() => chooseOption(2)}
                            >
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    {(chosenOption === 2) &&
                                    <img style={{width: '32px', height: '32px'}} src={'https://lil-proxy.herokuapp.com/static/shopify_tick.png'} alt={'tick'}/>}
                                    <div style={{display: "flex", flexDirection: "column", marginLeft: '20px'}}>
                                        <Heading>
                                            Banner first
                                        </Heading>
                                        <p>
                                            Incredible label which will underline the unique of your products.
                                        </p>
                                    </div>
                                </div>
                                <img style={{width: '120px'}} src={'https://lil-proxy.herokuapp.com/static/flash_sale.png'} alt={'design'}/>
                            </div>
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <Card sectioned>
                            <div
                                style={{display: "flex", justifyContent: "space-between", width: '100%'}}
                                onClick={() => chooseOption(3)}
                            >
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    {(chosenOption === 3) &&
                                    <img style={{width: '32px', height: '32px'}} src={'https://lil-proxy.herokuapp.com/static/shopify_tick.png'} alt={'tick'}/>}
                                    <div style={{display: "flex", flexDirection: "column", marginLeft: '20px'}}>
                                        <Heading>
                                            Banner first
                                        </Heading>
                                        <p>
                                            Gift animation to your customers!
                                        </p>
                                    </div>
                                </div>
                                <img style={{width: '120px'}} src={'https://lil-proxy.herokuapp.com/static/gift.gif'} alt={'design'}/>
                            </div>
                        </Card>
                    </Layout.Section>
                </div>
                <Layout.Section>
                <div style={{display: "flex", justifyContent: "center", width: '100%', marginBottom: '10px', marginTop: '40px', fontFamily: 'ShopifySans, Helvetica, Arial, sans-serif'}}>
                    <ShopifyButton
                        variant="contained"
                        color="primary"
                        size={'large'}
                    >
                        Continue
                    </ShopifyButton>
                </div>
                </Layout.Section>
            </Layout>
        </Page>
    )
};

export default BannerVariants