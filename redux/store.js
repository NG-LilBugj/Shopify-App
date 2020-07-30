import {localesReducer} from "./localesReducer";
import {combineReducers, createStore} from "redux";
import {configsReducer} from "./configsReducer";

let reducers = combineReducers({localesReducer, configsReducer});

const store = createStore(reducers);

export default store