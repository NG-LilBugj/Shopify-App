const SET_CONFIGS = 'configs_reducers/SET_CONFIGS';

const initState = {
    countdownConfig: {

    },
    saleConfig: {

    },
    popupConfig: {

    }
};

export const configsReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_CONFIGS: return {
            ...state,
            countdownConfig: action.countdownConfig,
            saleConfig: action.saleConfig,
            popupConfig: action.popupConfig
        };
        default: return state
    }
};

export const setConfigs = (countdownConfig, saleConfig, popupConfig) => ({type: SET_CONFIGS, countdownConfig, saleConfig, popupConfig});
