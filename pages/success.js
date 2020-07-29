import {Button, EmptyState, Page} from "@shopify/polaris";
import Link from "next/link"
import {connect, useSelector} from "react-redux";

const Success = () => {

    const strings = useSelector(state => state.stringsToDisplay.strings.success);

    return (
        <Page>
        <EmptyState
            heading={strings.mainHeader}
            image={'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg'}
        >
            <Link href={'/'}><Button primary>{strings.button}</Button></Link>
        </EmptyState>
        </Page>
    )
};

export default Success