import {Button, DisplayText, EmptyState, Heading, Layout, Page} from "@shopify/polaris";
import Link from "next/link"
import {connect, useSelector} from "react-redux";
import {ShopifyButton} from "../utils/ShopifyButton";

const Success = () => {

    const strings = useSelector(state => state.localesReducer.stringsToDisplay.strings.success);

    return (
        <Page>
            <Layout>
                <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center", width: '100%', height: '100%'}}>
                    <div style={{display: "flex", flexDirection: "column", width: "50%", height: "420px", justifyContent: "space-evenly"}}>
                        <DisplayText size={'extraLarge'}>
                            {strings.mainHeading}
                        </DisplayText>
                        <DisplayText size="small">
                            {strings.messageTimer}
                        </DisplayText>
                        <div style={{width: '200px'}}>
                            <Link href={'/'}><Button primary>{strings.button}</Button></Link>
                        </div>
                    </div>
                    <img src={'https://lil-proxy.herokuapp.com/static/revenue.gif'} alt={'sale'}/>
                </div>
            </Layout>
        </Page>
    )
};

export default Success