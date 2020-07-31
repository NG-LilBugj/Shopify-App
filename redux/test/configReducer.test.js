import {configsReducer, handleCountdownProducts} from "../configsReducer";

it('note should be deleted', () => {
    let action = handleCountdownProducts([{id: "2"}, {id: "40"}], false);

    let state = {
        countdownConfig: {
            config: false,
            script: [
                {configData: {
                    products: [
                        {id: "40"}, {id: "50"}
                    ]
                    }}
            ],
        },
        displayWarnings: {
            countdown: {
                isWarning: false,
                reason: {
                    string: '',
                    elements: []
                }
            },
        }
    };

    let newState = configsReducer(state, action);
    expect(newState.displayWarnings.countdown.reason.elements.length).toBe(1)
});