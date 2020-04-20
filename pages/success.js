import {Button, EmptyState, Page} from "@shopify/polaris";


const Success = () => {

    return (
        <Page>
        <EmptyState
            heading={"Timer added successful!"}
            image={'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg'}>
        </EmptyState>
        </Page>
    )
};

export default Success