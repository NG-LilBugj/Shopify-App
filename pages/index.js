import {
    Layout,
    Page, InlineError,
} from "@shopify/polaris";
import {useCallback, useState, useEffect} from "react";
import Link from 'next/link'
import InitPage from "../components/initPage";
import BannerVariants from "../components/bannerVariants";

const Initial = () => {

    const [isSecondPage, setSecondPage] = useState(false);

    return (
        <Page>
                <Layout.Section>
                    {isSecondPage ?
                        <BannerVariants/> :
                        <InitPage
                            setSecondPage={setSecondPage}
                        />}
                </Layout.Section>
        </Page>
    )
};

export default Initial
