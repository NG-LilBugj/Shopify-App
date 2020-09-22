import {Button, DisplayText, Layout, Page} from "@shopify/polaris";
import Link from "next/link";
import axios from "axios";

const BillingPage = () => {

    const preBilling = () => {
        axios.get('https://lil-shopify.herokuapp.com').catch(e => console.log(e))
    };

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
                            <Button primary
                                    onClick={preBilling}
                            >{strings.button}</Button>
                        </div>
                    </div>
                </div>
            </Layout>
        </Page>
    )
};

export default BillingPage