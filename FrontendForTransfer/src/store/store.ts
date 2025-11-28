import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {countryApi} from "../services/CountryService/CountryService.ts";
import {cityApi} from "../services/CityService/CityService.ts";

const rootReducer = combineReducers({

    [countryApi.reducerPath]: countryApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,

});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(countryApi.middleware, cityApi.middleware),

    });
};


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];