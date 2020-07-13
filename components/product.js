import {Button, Thumbnail} from "@shopify/polaris";


const Product = (props) => {

    const removeProduct = (product) => (product.id !== props.id);

    return(
        <div style={{display: 'flex', justifyContent: 'space-between', height: '40px'}}>
            <Thumbnail
                source={props.photo}
                alt={props.title}
            />
            <div style={{marginLeft: '10px'}}>
                {props.title}
            </div>
            <div style={{height: '25px'}}>
            <Button
                size={'small'}
                onClick={() => props.pickProducts(
                    props.products.filter(removeProduct)
                )}
            >
                Remove
            </Button>
            </div>
        </div>
    )
};

export default Product