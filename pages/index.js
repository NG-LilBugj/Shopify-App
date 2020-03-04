import {Layout, Page, TextStyle, EmptyState} from '@shopify/polaris'

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

const Initial = () => (
    <div>
        <Page>
            <Layout>
       <TextStyle variation={"positive"}>
           Sample App
       </TextStyle>
                <EmptyState heading={"Discounts!"} action={{
                    content: 'Select Products',
                    onAction: () => alert('clicked'),
                }} image={img}>
                    <p>Select products</p>
                </EmptyState>
            </Layout>
        </Page>
    </div>
);

export default Initial