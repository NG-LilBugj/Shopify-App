import {Layout, Page, TextStyle, EmptyState} from '@shopify/polaris'
import { TitleBar, ResourcePicker } from '@shopify/app-bridge-react';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Initial extends React.Component
{
    state = {
      open: false
    };
    handleSelection = (resources) => {
        const idsFromResources = resources.selection.map((product) => product.id);
        this.setState({ open: false });
        console.log(idsFromResources)
    };
    render = () => (
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
                    onCancel={() => this.setState({ open: false })}
                />
                <Layout>
                    <TextStyle variation={"positive"}>
                        Sample App
                    </TextStyle>
                    <EmptyState heading={"Discounts!"} action={{
                        content: 'Select Products',
                        onAction: () => this.setState({ open: true }),
                    }} image={img}>
                        <p>Select products</p>
                    </EmptyState>
                </Layout>
            </Page>
        </div>
    );
}

export default Initial