import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type ICountry from "../../models/Country/ICountry.ts";
import API_ENV from "../../env";
import type ICountryEditFormState from "../../models/Country/ICountryEditFormState.ts";
import type ICountryCreateFormState from "../../models/Country/ICountryCreateFormState.ts";
import {serialize} from "object-to-formdata";


export const countryApi = createApi({
    reducerPath: 'countryAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_ENV.API_BASE_URL}/api/`

    }),
    tagTypes: ['Country'],
    endpoints: (build) => ({
        fetchAllCountries: build.query<ICountry[], void>({
            query: () => ({
                url: 'Countries',
            }),
            providesTags: ['Country'],
        }),
        addCountry: build.mutation<ICountry, ICountryCreateFormState>({
            query: (model) => {
                const body = serialize(model)
                return{
                    url: 'Countries/Create',
                    method: 'POST',
                    body: body,
                }

            },
            invalidatesTags: ['Country'], // після створення оновлюємо кеш fetchAllCountries
        }),
        deleteCountry: build.mutation<boolean, number>({
            query: (id) => ({
                url: `Countries/Delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Country']
        }),
        editCountry: build.mutation<ICountry, ICountryEditFormState>({
            query: (model) => {

                const body = serialize(model)



                return {
                    url: 'Countries/Edit',
                    method: 'PUT',
                    body
                };
            },
            invalidatesTags: ['Country']
        })
    }),

})