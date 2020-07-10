import {Button, Thumbnail} from "@shopify/polaris";

const Collection = (props) => {

    const removeCollection = (collection) => (collection.handle !== props.id);

    return(
        <div style={{display: 'flex', justifyContent: 'space-between', height: '40px'}}>
            <div>
                {props.title}
            </div>
            <Button
                size={'small'}
                onClick={() => props.pickCollections(
                    props.collections.filter(removeCollection)
                )}
            >
                Remove
            </Button>
        </div>
    )
};

export default Collection