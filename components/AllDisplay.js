import {Button, DisplayText, Icon} from "@shopify/polaris";
import {DeleteMinor} from "@shopify/polaris-icons";

const AllDisplay = (props) => {
    return (
        <div style={{
            width: "100%",
            height: "96px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: 'center',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: '0 0 1px #666'
        }}>
        <div style={{color: "#006fbb"}}>
            <DisplayText>{props.string}</DisplayText>
        </div>
            <Button
                size={'small'}
                onClick={() => props.setAllItems(false)}
            >
                {props.cancel}
            </Button>
        </div>
    )
};

export default AllDisplay