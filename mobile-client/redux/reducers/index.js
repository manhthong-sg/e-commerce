import { combineReducers } from "redux";

import userReducer  from "./userReducer";
import cartReducer  from "./cartReducer";
import favoriteReducer  from "./favoriteReducer";
import orderReducer  from "./orderReducer";

let reducers =combineReducers({
    userReducer: userReducer,
    cartReducer: cartReducer,
    favoriteReducer: favoriteReducer,
    orderReducer: orderReducer,

})

const rootReducer = (state, action ) => {
    if (action.type === 'USER_LOGOUT') {
        return reducers(undefined, action)
      }
    return reducers(state, action);
}

export default rootReducer;