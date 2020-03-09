import {Layout, Page, TextStyle, EmptyState} from '@shopify/polaris'
import {TitleBar, ResourcePicker} from '@shopify/app-bridge-react';
import ResourceListWithProducts from "../components/ResourceList";
import Cookies from 'js-cookie'
import store from 'store-js'
import {Toast} from "@shopify/app-bridge/actions";
import {createApp} from "@shopify/app-bridge";

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

const app = createApp({
    apiKey: API_KEY,
    shopOrigin: Cookies.get("shopOrigin")
});

class Initial extends React.Component {
    state = {
        open: false
    };

    componentDidMount() {
        Toast.create(app, {message: 'yoyoyo', duration: 3000}).dispatch(Toast.Action.SHOW)
    }

    handleSelection = (resources) => {
        const idsFromResources = resources.selection.map((product) => product.id);
        this.setState({open: false});
        store.set('ids', idsFromResources)
    };

    render() {
        const emptyState = !store.get('ids');
        return (
            <div>
                <Page>
                    <TitleBar primaryAction={{
                        content: 'Select products',
                        onAction: () => this.setState({open: true})
                    }}/>
                    <ResourcePicker
                        resourceType="Product"
                        showVariants={false}
                        open={this.state.open}
                        onSelection={(resources) => this.handleSelection(resources)}
                        onCancel={() => this.setState({open: false})}
                    />
                    { emptyState ? (
                        <Layout>
                            <TextStyle variation={"positive"}>
                                Sample App
                            </TextStyle>
                            <EmptyState heading={"Discounts!"} action={{
                                content: 'Select Products',
                                onAction: () => this.setState({open: true}),
                            }} image={img}>
                                <p>Select products</p>
                            </EmptyState>
                        </Layout>)
                        :
                        (< ResourceListWithProducts/>)
                    }
                </Page>
            </div>
        )
    };
}

export default Initial