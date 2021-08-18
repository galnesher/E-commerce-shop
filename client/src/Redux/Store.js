import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './Reducers/userReducer';
import { productReducer } from './Reducers/productReducer';
import { cartReducer } from './Reducers/cartReducer';
import { orderReducer } from './Reducers/orderReducer';
import { categoriesReducer } from './Reducers/CategoriesReducer';
import { adminReducer } from './Reducers/adminReducer';


// const initailState = { UserReducer: { isLogged: checkToken === true ? true : false, } };
const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
    combineReducers({
        UserReducer: userReducer,
        ProductReducer: productReducer,
        CategoriesReducer: categoriesReducer,
        CartReducer: cartReducer,
        OrderReducer: orderReducer,
        AdminReducer: adminReducer,

    }),
    // initailState,

    composeEnhancer(applyMiddleware(thunk))
);

export default store;


