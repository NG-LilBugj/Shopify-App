import {useCallback, useState, useEffect} from "react";
import InitPage from "../components/initPage";
import BannerVariants from "../components/bannerVariants";
import axios from "axios";
import {connect} from "react-redux";
import {setConfigs} from "../redux/configsReducer";
import {Layout, Page} from "@shopify/polaris";
import MainScreen from "../components/MainScreen";

const Initial = (props) => {
    // init page, constructed from first and second pages
    useEffect(() => {
        let animation = axios.get('https://lil-shopify.herokuapp.com/api/animation');
        let saleBadge = axios.get('https://lil-shopify.herokuapp.com/api/badge');
        let countdown = axios.get('https://lil-shopify.herokuapp.com/api/script');
        Promise.all([animation, saleBadge, countdown]).then(values => {
            setLoading(false);
            const [animation, saleBadge, countdown] = values;
            props.setConfigs(countdown.data, saleBadge.data, animation.data);
            receiveBannerData(values.map(v => v.data))
        })
    }, []);

    const [isSecondPage, setSecondPage] = useState(false);
    const [bannerData, receiveBannerData] = useState([null, null, null]);
    const [isLoading, setLoading] = useState(true);

    if (isLoading) return <Page><Layout><img src={
        'https://lil-proxy.herokuapp.com/static/Preloader.gif'
    } alt={'shock'}/></Layout></Page>;
    else return (
        (props.configData.countdownConfig.config || props.configData.saleConfig.config || props.configData.popupConfig.config) ? <MainScreen/> :
            isSecondPage ?
                <BannerVariants
                    bannerData={bannerData}
                /> :
                <InitPage
                    setSecondPage={setSecondPage}
                />

    )
};

let mapStateToProps = (state) => ({
    configData: state.configsReducer
});

export default connect(mapStateToProps, {
    setConfigs
})(Initial)
