import {Card, DisplayText, Heading, Layout, Page, TextStyle} from "@shopify/polaris";
import {Button, withStyles} from "@material-ui/core"
import {useState} from "react";
import Link from "next/link";
import BannerInfo from "./BannerInfo";

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
    console.log(props);
    const [chosenOption, chooseOption] = useState(1);

    return (
        <Page>
            <Layout>
                <div style={{marginBottom: '60px', marginTop: '30px'}}>
                    <DisplayText size={'large'} element={'h1'}>
                        Which wat do you want to increase revenue?
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
                                cursor: "pointer"
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
                                        Countdown timer bar
                                    </Heading>
                                    <p style={{width: '320px'}}>
                                        Special countdown timer which can render on product or other pages, signs
                                        that great offer has begun!
                                    </p>
                                    <i style={{fontWeight: '300'}}>
                                        About 20% more revenue
                                    </i>
                                </div>
                            </div>
                            <div style={{display: "flex", alignItems: 'center'}}>
                                <img style={{width: '90px', height: '41px'}}
                                     src={'https://lil-proxy.herokuapp.com/static/day_left.png'} alt={'design'}/>
                            </div>
                        </div>
                    </Card>
                    {props.bannerData[2].config &&
                    <BannerInfo
                        data={props.bannerData[2]}
                        link={'/countdown'}
                    />
                    }
                    <Card sectioned>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                maxWidth: '540px',
                                cursor: "pointer"
                            }}
                            onClick={() => chooseOption(2)}
                        >
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {(chosenOption === 2) &&
                                <img style={{width: '32px', height: '32px'}}
                                     src={'https://lil-proxy.herokuapp.com/static/shopify_tick.png'} alt={'tick'}/>}
                                <div style={{display: "flex", flexDirection: "column", marginLeft: '20px'}}>
                                    <Heading>
                                        Sale banners
                                    </Heading>
                                    <p style={{width: '320px'}}>
                                        Incredible label which will underline the unique of your products.
                                    </p>
                                    <i style={{fontWeight: '300'}}>
                                        About 25% more revenue
                                    </i>
                                </div>
                            </div>
                            <div style={{display: "flex", alignItems: 'center'}}>
                                <img style={{width: '90px'}}
                                     src={'https://lil-proxy.herokuapp.com/static/flash_sale.png'} alt={'design'}/>
                            </div>
                        </div>
                    </Card>
                    {props.bannerData[1].config &&
                    <BannerInfo
                        data={props.bannerData[1]}
                        link={'/badges'}
                    />
                    }
                    <Card sectioned>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                maxWidth: '540px',
                                cursor: "pointer"
                            }}
                            onClick={() => chooseOption(3)}
                        >
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {(chosenOption === 3) &&
                                <img style={{width: '32px', height: '32px'}}
                                     src={'https://lil-proxy.herokuapp.com/static/shopify_tick.png'} alt={'tick'}/>}
                                <div style={{display: "flex", flexDirection: "column", marginLeft: '20px'}}>
                                    <Heading>
                                        Discount popups
                                    </Heading>
                                    <p style={{width: '320px'}}>
                                        Gift animation to your customers!
                                    </p>
                                    <i style={{fontWeight: '300'}}>
                                        About 15% more revenue
                                    </i>
                                </div>
                            </div>
                            <img style={{width: '90px'}} src={'https://lil-proxy.herokuapp.com/static/gift.gif'}
                                 alt={'design'}/>
                        </div>
                    </Card>
                    {props.bannerData[0].config &&
                    <BannerInfo
                        data={props.bannerData[0]}
                        link={'/animations'}
                    />}
                </div>
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
                            disabled={(chosenOption === 3)}
                        >
                            Continue
                        </ShopifyButton>
                    </Link>
                    {(chosenOption === 3) && <DisplayText>
                        <TextStyle variation={'negative'}>
                            This feature has not embedded yet
                        </TextStyle>
                    </DisplayText>}
                </div>
            </Layout>
        </Page>
    )
};

export default BannerVariants