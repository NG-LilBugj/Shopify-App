const SET_CONFIGS = 'configs_reducer/SET_CONFIGS';
const SET_COUNTDOWN_ID = 'configs_reducer/SET_COUNTDOWN_ID';
const SET_SALE_ID = 'configs_reducer/SET_SALE_ID';
const SET_POPUP_ID = 'configs_reducer/SET_POPUP_ID';

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
    },
    dispatchedIds: {
        countdownId: 0,
        saleId: 0,
        popupId: 0
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
        case SET_COUNTDOWN_ID: return {
            ...state,
            dispatchedIds: {
                ...state.dispatchedIds,
                countdownId: action.id
            }
        };
        case SET_SALE_ID: return {
            ...state,
            dispatchedIds: {
                ...state.dispatchedIds,
                saleId: action.id
            }
        };
        case SET_POPUP_ID: return {
            ...state,
            dispatchedIds: {
                ...state.dispatchedIds,
                popupId: action.id
            }
        };
        default: return state
    }
};

export const setConfigs = (countdownConfig, saleConfig, popupConfig) =>
    ({type: SET_CONFIGS, countdownConfig, saleConfig, popupConfig});
export const setCountdownId = (id) => ({type: SET_COUNTDOWN_ID, id});
export const setSaleId = (id) => ({type: SET_SALE_ID, id});
export const setPopupId = (id) => ({type: SET_POPUP_ID, id});
