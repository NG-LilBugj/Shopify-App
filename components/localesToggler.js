import {ActionList, Button, Icon, Popover} from "@shopify/polaris";
import {useCallback, useState} from "react";
import {SettingsMajorMonotone} from "@shopify/polaris-icons";
import {setLocales} from "../redux/localesReducer";
import {connect} from "react-redux";

const LocalesToggler = (props) => {

    const [localePopoverActive, setLocalePopoverActive] = useState(false);

    const toggleLocalePopoverActive = useCallback(
        () => setLocalePopoverActive((popoverActive) => !popoverActive),
        [],
    );

    const activator = (
        <Button
            plain
            onClick={toggleLocalePopoverActive}
        >
            <Icon source={SettingsMajorMonotone}/>
        </Button>
    );

    return(
        <div style={{marginTop: '20px'}}>
            <Popover
                active={localePopoverActive}
                activator={activator}
                onClose={toggleLocalePopoverActive}
            >
                <ActionList items={[
                    {content: 'English', onAction: () => props.setLocales('en')},
                    {content: 'Russian', onAction: () => props.setLocales('ru')},
                    {content: 'German', onAction: () => props.setLocales('de')},
                    {content: 'Czech', onAction: () => props.setLocales('cs')},
                    {content: 'Danish', onAction: () => props.setLocales('da')},
                    {content: 'Dutch', onAction: () => props.setLocales('nl')},
                    {content: 'Spanish', onAction: () => props.setLocales('es')},
                    {content: 'Finnish', onAction: () => props.setLocales('fi')},
                    {content: 'French', onAction: () => props.setLocales('fr')},
                    {content: 'Hindi', onAction: () => props.setLocales('hi')},
                    {content: 'Italian', onAction: () => props.setLocales('it')},
                    {content: 'Korean', onAction: () => props.setLocales('ko')},
                    {content: 'Norwegian', onAction: () => props.setLocales('no')},
                    {content: 'Polish', onAction: () => props.setLocales('pl')},
                    {content: 'Portuguese', onAction: () => props.setLocales('pt')},
                    {content: 'Swedish', onAction: () => props.setLocales('sv')},
                    {content: 'Thai', onAction: () => props.setLocales('th')},
                    {content: 'Turkish', onAction: () => props.setLocales('tr')},
                    ]} />
            </Popover>
        </div>
    )
};

export default connect(null, {setLocales})(LocalesToggler)