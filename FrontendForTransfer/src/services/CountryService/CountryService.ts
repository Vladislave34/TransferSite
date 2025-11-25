import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type ICountry from "../../models/ICountry.ts";
import API_ENV from "../../env";


export const countryApi = createApi({
    reducerPath: 'countryAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_ENV.API_BASE_URL}/api/`

    }),
    tagTypes: ['POST'],
    endpoints: (build) => ({
        fetchAllCountries: build.query<ICountry[], void>({
            query: () => ({
                url: 'Countries',
            }),
            providesTags: ['POST'],
        }),
        addCountry: build.mutation<ICountry, FormData>({
            query: (formData) => ({
                url: 'Countries',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['POST'], // після створення оновлюємо кеш fetchAllCountries
        }),
    }),

})