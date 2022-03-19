import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthReducer from './reducers/auth';
import cartReducer from './reducers/cart';
import orderReducer from './reducers/order';
import productsReducer from './reducers/products';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ["cart", "orders"]
    // whitelist includes the values of the state object that we want to persist/ save to AsyncStorage, 
    // whenever state changes, cart value of rootReducer is saved to AsyncStorage;
}


const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: orderReducer,
    auth: AuthReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store)

// persistor.purge() // to delete all the data or saved state in AsyncStorage;

export default { store, persistor };