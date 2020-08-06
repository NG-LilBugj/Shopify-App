import {DisplayText, Heading, Layout, Page} from "@shopify/polaris";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {useEffect} from "react";
import axios from "axios";

const ShopifyButton = withStyles({
    root: {
        padding: '10px 20px',
        textTransform: 'none',
        fontSize: 18,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
})(Button);

const InitPage = (props) => {

    useEffect(() => {
        axios.get('https://lil-shopify.herokuapp.com/amplitude/intro')
            .then(res => console.log(res.data))
            .catch(e => console.log(e));
    }, []);

    return(
        <Page>
            <Layout>
                <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center", width: '100%', height: '100%'}}>
                    <div style={{display: "flex", flexDirection: "column", width: "50%", height: "420px", justifyContent: "space-evenly"}}>
                        <DisplayText size={'extraLarge'}>
                            {props.strings.mainHeader}
                        </DisplayText>
                        <DisplayText size="small">
                            {props.strings.subheader}
                        </DisplayText>
                        <div style={{width: '200px'}}>
                        <ShopifyButton
                            variant="contained"
                            color="primary"
                            size={'large'}
                            onClick={() => {
                                props.setSecondPage(true)
                            }}
                        >
                            {props.strings.button}
                        </ShopifyButton>
                        </div>
                    </div>
                    <img src={'https://lil-proxy.herokuapp.com/static/sale.gif'} alt={'sale'}/>
                </div>
            </Layout>
        </Page>
    )
};

const mapStateToProps = (state) => ({
    strings: state.localesReducer.stringsToDisplay.strings.initPage
});

export default connect(mapStateToProps)(InitPage)