import {Button, Icon, Thumbnail} from "@shopify/polaris";
import {DeleteMinor} from "@shopify/polaris-icons";


const Product = (props) => {

    const removeProduct = (product) => (product.id !== props.id);

    return(
        <div style={{
            width: "100%",
            height: "64px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: 'center',
            padding: '10px 10px 10px 4px',
            borderRadius: '1px',
            boxShadow: '0 0 1px #666'
        }}>
            <Thumbnail
                source={props.photo}
                alt={props.title}
            />
            <div style={{marginLeft: '10px', fontWeight: '700'}}>
                {props.title}
            </div>
            <Button
                size={'small'}
                onClick={() => props.pickProducts(
                    props.products.filter(removeProduct)
                )}
            >
                <Icon source={DeleteMinor}/>
            </Button>
        </div>
    )
};

export default Product