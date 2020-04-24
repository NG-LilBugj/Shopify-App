import {Button, EmptyState, Page} from "@shopify/polaris";
import Link from "next/link"

const Success = () => {

    return (
        <Page>
        <EmptyState
            heading={"Timer added successful!"}
            image={'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg'}>
            <Link href={'/'}><Button primary>Go to main</Button></Link>
        </EmptyState>
        </Page>
    )
};

export default Success