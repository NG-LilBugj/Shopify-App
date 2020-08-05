import {Button, EmptyState, Heading, Page} from "@shopify/polaris";
import Link from "next/link"
import {connect, useSelector} from "react-redux";

const Success = () => {

    const strings = useSelector(state => state.localesReducer.stringsToDisplay.strings.success);

    return (
        <Page>
        <EmptyState
            heading={strings.mainHeading}
            image={'https://lil-proxy.herokuapp.com/static/revenue.gif'}
        >
            <div style={{marginBottom: '25px'}}><Heading>{strings.messageTimer}</Heading></div>
            <Link href={'/'}><Button primary>{strings.button}</Button></Link>
        </EmptyState>
        </Page>
    )
};

export default Success