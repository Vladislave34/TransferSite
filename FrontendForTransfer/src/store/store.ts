import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {countryApi} from "../services/CountryService/CountryService.ts";
import {cityApi} from "../services/CityService/CityService.ts";
import {googleApi} from "../services/GoogleAuthServise/GoogleAuthServise.ts";

const rootReducer = combineReducers({

    [countryApi.reducerPath]: countryApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
    [googleApi.reducerPath]: googleApi.reducer,

});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(countryApi.middleware, cityApi.middleware, googleApi.middleware),

    });
};


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];