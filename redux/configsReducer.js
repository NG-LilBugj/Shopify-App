const SET_CONFIGS = 'configs_reducer/SET_CONFIGS';
const SET_COUNTDOWN_ID = 'configs_reducer/SET_COUNTDOWN_ID';
const SET_SALE_ID = 'configs_reducer/SET_SALE_ID';
const SET_POPUP_ID = 'configs_reducer/SET_POPUP_ID';
const HANDLE_COUNTDOWN_DISPLAY = 'configs_reducer/HANDLE_COUNTDOWN_DISPLAY';
const HANDLE_COUNTDOWN_PRODUCTS = 'configs_reducer/HANDLE_COUNTDOWN_PRODUCTS';
const HANDLE_COUNTDOWN_COLLECTIONS = 'configs_reducer/HANDLE_COUNTDOWN_COLLECTIONS';
const HANDLE_SALE_PRODUCTS = 'configs_reducer/HANDLE_SALE_PRODUCTS';
const HANDLE_POPUP_PRODUCTS = 'configs_reducer/HANDLE_POPUP_PRODUCTS';

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
    },
    displayWarnings: {
        countdown: {
            isWarning: false,
            reason: {
                string: '',
                elements: []
            }
        },
        sale: {
            isWarning: false,
            reason: {
                string: '',
                elements: []
            }
        },
        popup: {
            isWarning: false,
            reason: {
                string: '',
                elements: []
            }
        },
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
        case HANDLE_COUNTDOWN_DISPLAY: {
            if (state.countdownConfig.script.length > 1) {
                let arr = state.countdownConfig.script.filter(c => c.id !== state.dispatchedIds.countdownId);
                if (action.display === 'all' && !!arr.length) return {
                    ...state,
                    displayWarnings: {
                        ...state.displayWarnings,
                        countdown: {
                            isWarning: true,
                            reason: {
                                string: 'display/all',
                                elements: []
                            }
                        }
                    }
                };
                else return {
                    ...state,
                    displayWarnings: {
                        ...state.displayWarnings,
                        countdown: {
                            isWarning: false,
                            reason: {
                                string: '',
                                elements: []
                            }
                        }
                    }
                }
            }
            else return state
        }
        case HANDLE_COUNTDOWN_COLLECTIONS: {
            if (state.countdownConfig.script.length > 1) {
                let arr = state.countdownConfig.script.filter(s => s.id !== state.dispatchedIds.countdownId)
                    .map(s => s.configData.collections.map(c => action.collections.filter(a => c.id === a.id)).map(e => e[0]))[0]
                    .filter(e => Boolean(e));
                if (arr[0] || state.countdownConfig.script.filter(s => s.id !== state.dispatchedIds.countdownId)
                    .filter(s => s.id !== state.dispatchedIds.countdownId).filter(s => s.display === 'all')) return {
                    ...state,
                    displayWarnings: {
                        ...state.displayWarnings,
                        countdown: {
                            isWarning: true,
                            reason: {
                                string: 'display/collections',
                                elements: arr
                            }
                        }
                    }
                };
                else if ((!!state.countdownConfig.script.filter(s => s.id !== state.dispatchedIds.countdownId)
                    .filter(s => s.configData.isAllCollection).length) || (!!state.countdownConfig.script
                    .filter(s => s.id !== state.dispatchedIds.countdownId).length && action.isAllCollection)) return {
                    ...state,
                    displayWarnings: {
                        ...state.displayWarnings,
                        countdown: {
                            isWarning: true,
                            reason: {
                                string: 'display/allCollections',
                                elements: []
                            }
                        }
                    }
                };
                else return {
                        ...state,
                        displayWarnings: {
                            ...state.displayWarnings,
                            countdown: {
                                isWarning: false,
                                reason: {
                                    string: '',
                                    elements: []
                                }
                            }
                        }
                    };
            }
            else return state
        }
        case HANDLE_COUNTDOWN_PRODUCTS: {
            if (state.countdownConfig.script.length > 1) {
                let arr = state.countdownConfig.script.filter(s => s.id !== state.dispatchedIds.countdownId)
                    .map(s => s.configData.products.map(c => action.products.filter(a => c.id === a.id)).map(e => e[0]))[0]
                    .filter(e => Boolean(e));
                if (arr[0]) return {
                    ...state,
                    displayWarnings: {
                        ...state.displayWarnings,
                        countdown: {
                            isWarning: true,
                            reason: {
                                string: 'display/products',
                                elements: arr
                            }
                        }
                    }
                };
                else if ((!!state.countdownConfig.script.filter(s => s.id !== state.dispatchedIds.countdownId)
                    .filter(s => s.configData.isAllProducts).length) || (!!state.countdownConfig.script
                    .filter(s => s.id !== state.dispatchedIds.countdownId).length && action.isAllProducts)) return {
                    ...state,
                    displayWarnings: {
                        ...state.displayWarnings,
                        countdown: {
                            isWarning: true,
                            reason: {
                                string: 'display/allProducts',
                                elements: []
                            }
                        }
                    }
                };
                else return {
                        ...state,
                        displayWarnings: {
                            ...state.displayWarnings,
                            countdown: {
                                isWarning: false,
                                reason: {
                                    string: '',
                                    elements: []
                                }
                            }
                        }
                    };
            }
            else return state
        }
        case HANDLE_SALE_PRODUCTS: {
            if (state.saleConfig.script.length > 1) {
                let arr = state.saleConfig.script.filter(s => s.id !== state.dispatchedIds.saleId)
                    .map(s => s.configData.products.map(c => action.products.filter(a => c.id === a.id)).map(e => e[0]))[0]
                    .filter(e => Boolean(e));
                if (arr[0]) return {
                    ...state,
                    displayWarnings: {
                        ...state.displayWarnings,
                        sale: {
                            isWarning: true,
                            reason: {
                                string: 'display/products',
                                elements: arr
                            }
                        }
                    }
                };
                else if (!!state.saleConfig.script.filter(s => s.id !== state.dispatchedIds.saleId)
                    .length && action.isAllProducts) return {
                    ...state,
                    displayWarnings: {
                        ...state.displayWarnings,
                        sale: {
                            isWarning: true,
                            reason: {
                                string: 'display/allProducts',
                                elements: []
                            }
                        }
                    }
                };
                else return {
                        ...state,
                        displayWarnings: {
                            ...state.displayWarnings,
                            sale: {
                                isWarning: false,
                                reason: {
                                    string: '',
                                    elements: []
                                }
                            }
                        }
                    };
            }
            else return state
        }
        case HANDLE_POPUP_PRODUCTS: {
            if (state.popupConfig.script.length > 0) {
                let arr = state.popupConfig.script.filter(s => s.id !== state.dispatchedIds.popupId)
                    .map(s => s.configData.products.map(c => action.products.filter(a => c.id === a.id)).map(e => e[0]))[0];
                console.log(arr);
                arr = arr ? arr.filter(e => Boolean(e)) : arr;
                console.log(arr);
                if (arr && !!action.products.length) return {
                    ...state,
                    displayWarnings: {
                        ...state.displayWarnings,
                        popup: {
                            isWarning: true,
                            reason: {
                                string: 'display/products',
                                elements: arr
                            }
                        }
                    }
                };
                else if (!!state.popupConfig.script.filter(s => s.id !== state.dispatchedIds.popupId)
                    .length && action.isAllProducts) return {
                    ...state,
                    displayWarnings: {
                        ...state.displayWarnings,
                        popup: {
                            isWarning: true,
                            reason: {
                                string: 'display/allProducts',
                                elements: []
                            }
                        }
                    }
                };
                else return {
                        ...state,
                        displayWarnings: {
                            ...state.displayWarnings,
                            popup: {
                                isWarning: false,
                                reason: {
                                    string: '',
                                    elements: []
                                }
                            }
                        }
                    };
            }
            else return state
        }
        default: return state
    }
};

export const setConfigs = (countdownConfig, saleConfig, popupConfig) =>
    ({type: SET_CONFIGS, countdownConfig, saleConfig, popupConfig});
export const setCountdownId = (id) => ({type: SET_COUNTDOWN_ID, id});
export const setSaleId = (id) => ({type: SET_SALE_ID, id});
export const setPopupId = (id) => ({type: SET_POPUP_ID, id});
export const handleCountdownDisplay = (display) => ({type: HANDLE_COUNTDOWN_DISPLAY, display});
export const handleCountdownProducts = (products, isAllProducts) => ({type: HANDLE_COUNTDOWN_PRODUCTS, products, isAllProducts});
export const handleCountdownCollections = (collections, isAllCollection) => ({
    type: HANDLE_COUNTDOWN_COLLECTIONS, collections, isAllCollection
});
export const handleSaleProducts = (products, isAllProducts) => ({type: HANDLE_SALE_PRODUCTS, products, isAllProducts});
export const handlePopupProducts = (products, isAllProducts) => ({type: HANDLE_POPUP_PRODUCTS, products, isAllProducts});