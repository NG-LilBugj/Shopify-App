import {Button, Icon} from "@shopify/polaris";
import {DeleteMajorMonotone, SettingsMajorMonotone} from "@shopify/polaris-icons";
import {useSelector} from "react-redux";

const DisplayedConfig = (props) => {

    const configStrings = useSelector(state => state.stringsToDisplay.strings.existing_config);

    return(
        <>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: '10px',
                borderBottom: "1px solid grey"
            }}>
                <p>{configStrings.bannerName}</p>
                <p>{configStrings.actions}</p>
            </div>
            <div style={{width: "100%", display: "flex", justifyContent: "space-between", padding: '10px'}}>
                <b style={{fontSize: "24px"}}>{props.configData ? props.configData.name : configStrings.timer}</b>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button
                        size={"medium"}
                        type={"submit"}
                        onClick={() => setInitBar(true)}>
                        <Icon source={SettingsMajorMonotone}/>
                    </Button>
                    <Button
                        destructive
                        size={"medium"}
                        type={"submit"}
                        onClick={deleteSubmit}>
                        <Icon source={DeleteMajorMonotone}/>
                    </Button>
                </div>
            </div>
        </>
    )
};

export default DisplayedConfig