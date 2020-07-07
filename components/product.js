import {Thumbnail} from "@shopify/polaris";


const Product = (props) => {
    return(
        <div style={{display: 'flex', justifyContent: 'space-between', width: '240px'}}>
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