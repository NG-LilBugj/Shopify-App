import {Button, Thumbnail} from "@shopify/polaris";


const Product = (props) => {
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
                onClick={() => console.log('removed')}
            >
                Remove
            </Button>
        </div>
    )
};

export default Product