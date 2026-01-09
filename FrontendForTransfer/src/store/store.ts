import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {countryApi} from "../services/CountryService/CountryService.ts";
import {cityApi} from "../services/CityService/CityService.ts";
import {googleApi} from "../services/GoogleAuthServise/GoogleAuthServise.ts";
import {authApi} from "../services/AuthService/AuthService.ts";
import {authorizedUserApi} from "../services/AuthorizedUser/AuthorizedUserService.ts";
import authReducer from "../store/reducers/authSlice.ts";
import paginationReducer from "../store/reducers/paginationSlice.ts";
import {transportationApi} from "../services/TransportationService/TransportationService.ts";
import {cartApi} from "../services/CartService/CartService.ts";

const rootReducer = combineReducers({
    paginationReducer,
    authReducer,
    [cartApi.reducerPath] : cartApi.reducer,
    [transportationApi.reducerPath] :  transportationApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
    [googleApi.reducerPath]: googleApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [authorizedUserApi.reducerPath]: authorizedUserApi.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                countryApi.middleware,
                cityApi.middleware,
                googleApi.middleware,
                authApi.middleware,
                authorizedUserApi.middleware,
                transportationApi.middleware,
                cartApi.middleware
            ),

    });
};


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];