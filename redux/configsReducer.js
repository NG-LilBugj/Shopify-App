const SET_CONFIGS = 'configs_reducers/SET_CONFIGS';

const initState = {
    countdownConfig: {
        config: false,
        script: [],
    },
    saleConfig: {
        config: false,
        script: [],
    },
    popupConfig: {
        config: false,
        script: [],
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
