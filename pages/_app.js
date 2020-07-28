import App from 'next/app'
import Head from 'next/head';
import {AppProvider} from "@shopify/polaris";
import '@shopify/polaris/styles.css'
import translations from '@shopify/polaris/locales/en.json'
import {Provider} from "@shopify/app-bridge-react";
import Cookies from 'js-cookie'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import fetch from "node-fetch";

const client = new ApolloClient({
      uri: 'http://localhost:8000/graphql',
    fetch: fetch
 });
// connection to ApolloClient

class MyApp extends App{
    // root component for app

    render(){
        const config = { apiKey: API_KEY, shopOrigin: Cookies.get("shopOrigin"), forceRedirect: true }; // config with connection data
        return(
            <React.Fragment>
                <Head>
                    <title>TopSale Banner</title>
                    <meta charSet="utf-8"/>
                </Head>
                <Provider config={config}>
                <AppProvider i18n={translations}>
                    <ApolloProvider client={client}>
                <this.props.Component {...this.props.pageProps}/>  {/*react children (all other pages*/}
                    </ApolloProvider>
                </AppProvider>
                </Provider>
            </React.Fragment>
        )
    }
}

export default MyApp;