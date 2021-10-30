import { combineReducers } from "redux";

import userReducer  from "./userReducer";

let reducers =combineReducers({
    userReducer: userReducer
})

const rootReducer = (state, action ) => {
    return reducers(state, action);
}

export default rootReducer;