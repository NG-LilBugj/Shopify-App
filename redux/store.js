import {localesReducer} from "./localesReducer";
import {createStore} from "redux";

const store = createStore(localesReducer);

export default store