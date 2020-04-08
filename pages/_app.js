import App from 'next/app'
import Head from 'next/head';
import {AppProvider} from "@shopify/polaris";
import '@shopify/polaris/styles.css'
import translations from '@shopify/polaris/locales/en.json'
import {Provider} from "@shopify/app-bridge-react";
import Cookies from 'js-cookie'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import axios from "axios"

const client = new ApolloClient({
    fetchOptions: {
        credentials: 'include'
    }
});

class MyApp extends App{
    componentDidMount(){
        axios.post('/admin/api/2020-04/script_tags.json', {
            "script-tag":{
                "event": 'onload',
                "src": 'https://lil-proxy.herokuapp.com/static/sample.js'
            }
        }).then(response => response)
            .catch(res => res)
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
                    <ApolloProvider client={client}>
                <this.props.Component {...this.props.pageProps}/>
                    </ApolloProvider>
                </AppProvider>
                </Provider>
            </React.Fragment>
        )
    }
}

export default MyApp;