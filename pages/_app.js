import App from 'next/app'
import Head from 'next/head';
import {AppProvider} from "@shopify/polaris";
import '@shopify/polaris/styles.css'
import translations from '@shopify/polaris/locales/en.json'

class MyApp extends App{
    render(){
        return(
            <React.Fragment>
                <Head>
                    <title>Sample App</title>
                    <meta charSet="utf-8"/>
                </Head>
                <AppProvider i18n={translations}>
                <props.Component {...this.props.pageProps}/>
                </AppProvider>
            </React.Fragment>
        )
    }
}

export default MyApp;