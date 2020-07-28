import {
    Layout,
    Page, InlineError,
} from "@shopify/polaris";
import {useCallback, useState, useEffect} from "react";
import InitPage from "../components/initPage";
import BannerVariants from "../components/bannerVariants";
import axios from "axios";

const Initial = () => {
    // init page, constructed from first and second pages
    useEffect(() => {
        let animation = axios.get('https://lil-shopify.herokuapp.com/api/animation');
        let saleBadge = axios.get('https://lil-shopify.herokuapp.com/api/badge');
        let countdown = axios.get('https://lil-shopify.herokuapp.com/api/script');
        Promise.all([animation, saleBadge, countdown]).then(values => {
            console.log(values);
            receiveBannerData(values.map(v => v.data))
        })
    }, []);

    const [isSecondPage, setSecondPage] = useState(false);
    const [bannerData, receiveBannerData] = useState([null, null, null]);

    return (
                    isSecondPage ?
                        <BannerVariants
                            bannerData={bannerData}
                        /> :
                        <InitPage
                            setSecondPage={setSecondPage}
                        />
    )
};

export default Initial
