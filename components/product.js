import {Button, Icon, Thumbnail} from "@shopify/polaris";
import {DeleteMinor} from "@shopify/polaris-icons";


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