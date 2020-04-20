import App from 'next/app'
import Head from 'next/head';
import {AppProvider} from "@shopify/polaris";
import '@shopify/polaris/styles.css'
import translations from '@shopify/polaris/locales/en.json'
import {Provider} from "@shopify/app-bridge-react";
import Cookies from 'js-cookie'

class MyApp extends App{
    componentDidMount(){
    }

    render(){
        const config = { apiKey: API_KEY, shopOrigin: Cookies.get("shopOrigin"), forceRedirect: true };
        return(
            <React.Fragment>
                <Head>
                    <title>Sample App</title>
                    <meta charSet="utf-8"/>
                </Head>
                <Provider config={config}>
                <AppProvider i18n={translations}>
                <this.props.Component {...this.props.pageProps}/>
                </AppProvider>
                </Provider>
            </React.Fragment>
        )
    }
}

export default MyApp;