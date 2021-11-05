import { combineReducers } from "redux";

import userReducer  from "./userReducer";
import cartReducer  from "./cartReducer";

let reducers =combineReducers({
    userReducer: userReducer,
    cartReducer: cartReducer,
})

const rootReducer = (state, action ) => {
    if (action.type === 'USER_LOGOUT') {
        return reducers(undefined, action)
      }
    return reducers(state, action);
}

export default rootReducer;