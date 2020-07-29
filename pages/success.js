import {Button, EmptyState, Page} from "@shopify/polaris";
import Link from "next/link"
import {connect} from "react-redux";

const Success = () => {

    return (
        <Page>
        <EmptyState
            heading={props.strings.mainHeader}
            image={'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg'}
        >
            <Link href={'/'}><Button primary>{props.strings.button}</Button></Link>
        </EmptyState>
        </Page>
    )
};

let mapStateToProps = (state) => ({
    strings: state.strings.success
});

export default connect(mapStateToProps)(Success)