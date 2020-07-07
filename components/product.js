import {Thumbnail} from "@shopify/polaris";


const Product = (props) => {
    return(
        <div style={{width: '240px'}}>
            <Thumbnail
                source={props.photo}
                alt={props.title}
            />
            <div>
                {props.title}
            </div>
        </div>
    )
};

export default Product