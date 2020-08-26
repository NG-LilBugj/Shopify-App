import {Button, Icon, Thumbnail} from "@shopify/polaris";
import {
    DeleteMinor
} from '@shopify/polaris-icons';

const Collection = (props) => {

    const removeCollection = (collection) => (collection.id !== props.id);

    return(
        <div style={{display: 'flex', justifyContent: 'space-between', height: '40px'}}>
            <div style={{marginLeft: '10px', fontWeight: '700'}}>
                {props.title}
            </div>
            <Button
                size={'small'}
                onClick={() => props.pickCollections(
                    props.collections.filter(removeCollection)
                )}
            >
                <Icon source={DeleteMinor}/>
            </Button>
        </div>
    )
};

export default Collection