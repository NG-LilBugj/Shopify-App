import {Thumbnail} from "@shopify/polaris";


const Product = (props) => {
    return(
        <div style={{display: 'flex', justifyContent: 'space-between', height: '40px'}}>
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