import { legacy_createStore as createStore,applyMiddleware,combineReducers  } from "redux";
import thunk from "redux-thunk";
import { products,cart,user,order } from "./reducer";

const currentCart=localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
const currentuser=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):{};
const initialState={
    cart:{ cartLoading: false, cartData: [...currentCart], cartError: ""},
    user:{ userLoading: false, userData: {...currentuser}, userError: ""},
};
const middleWare=[thunk];
const reducers=combineReducers({products,cart,user,order});
const store=createStore(reducers,initialState,applyMiddleware(...middleWare));
export default store;