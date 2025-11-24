import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {countryApi} from "../services/CountryService/CountryService.ts";

const rootReducer = combineReducers({

    [countryApi.reducerPath]: countryApi.reducer,

});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(countryApi.middleware),
    });
};


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];