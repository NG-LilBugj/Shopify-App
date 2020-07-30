import {Button, Icon} from "@shopify/polaris";
import {DeleteMajorMonotone, SettingsMajorMonotone} from "@shopify/polaris-icons";
import {connect, useSelector} from "react-redux";
import axios from "axios";
import {setConfigs, setCountdownId, setPopupId, setSaleId} from "../redux/configsReducer";
import {useEffect} from "react";
import Link from "next/link";

const DisplayedConfig = (props) => {
    useEffect(() => {
        console.log(props)
    }, []);

    const configStrings = useSelector(state => state.localesReducer.stringsToDisplay.strings.existing_config);

    const deleteSubmit = () => {
        let path = (props.src === 'https://lil-storage.herokuapp.com/static/script.js') ? 'script' :
            (props.src === 'https://lil-storage.herokuapp.com/static/badge.js') ? 'badge' : 'animation';
        axios.delete(`https://lil-shopify.herokuapp.com/api/${path}?id=${props.id}`).then(res => {
            console.log(res);
            let animation = axios.get('https://lil-shopify.herokuapp.com/api/animation');
            let saleBadge = axios.get('https://lil-shopify.herokuapp.com/api/badge');
            let countdown = axios.get('https://lil-shopify.herokuapp.com/api/script');
            Promise.all([animation, saleBadge, countdown]).then(values => {
                const [animation, saleBadge, countdown] = values;
                props.setConfigs(countdown.data, saleBadge.data, animation.data);
            })
        });
    };

    const handleDispatch = () => {
        switch (props.src) {
            case 'https://lil-storage.herokuapp.com/static/script.js': {
                props.setCountdownId(props.id)
            }
            break;
            case 'https://lil-storage.herokuapp.com/static/badge.js': {
                props.setSaleId(props.id)
            }
            break;
            case 'https://lil-storage.herokuapp.com/static/animation.js': {
                props.setCountdownId(props.id)
            }
            break;
            default: console.log('id dispatching error')
        }
    };

    const calculatePath = () => {
        switch (props.src) {
            case 'https://lil-storage.herokuapp.com/static/script.js': return '/countdown';
            case 'https://lil-storage.herokuapp.com/static/badge.js': return '/badges';
            case 'https://lil-storage.herokuapp.com/static/animation.js': return '/animations';
            default:
                console.log('id dispatching error')
        }
    };

    return(
        <div>
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
                    <Link href={calculatePath()}>
                        <Button
                            size={"medium"}
                            type={"submit"}
                            onClick={handleDispatch}>
                            <Icon source={SettingsMajorMonotone}/>
                        </Button>
                    </Link>
                    <Button
                        destructive
                        size={"medium"}
                        type={"submit"}
                        onClick={deleteSubmit}>
                        <Icon source={DeleteMajorMonotone}/>
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default connect(null, {
    setConfigs,
    setCountdownId,
    setSaleId,
    setPopupId
})(DisplayedConfig)