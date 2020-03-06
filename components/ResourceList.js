import gql from 'graphql-tag';
import {Query} from 'react-apollo'
import
{   Card,
    ResourceList,
    Stack,
    TextStyle,
    Thumbnail,
} from "@shopify/polaris";
import store from 'store-js'

const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: ID!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        descriptionHtml
        id
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id
            }
          }
        }
      }
    }
  }
`;

class ResourceListWithProducts extends React.Component {
    render() {
        const twoWeeksFromNow = new Date(Date.now() + 12096e5).toDateString();
        return (
            <Query query={GET_PRODUCTS_BY_ID} variables={{ids: store.get('ids')}}>
                {({data, loading, error}) => {
                    if (loading) return <div><h2>Loading...</h2></div>;
                    if (error) return <div><h2>{error.message}</h2></div>;
                    console.log(data);
                    return <Card>
                        <p>Stuff here...</p>
                    </Card>
                }}
            </Query>
        )
    }
}

export default ResourceListWithProducts