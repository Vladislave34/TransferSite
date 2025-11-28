import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type ICountry from "../../models/Country/ICountry.ts";
import API_ENV from "../../env";
import type ICountryEditFormState from "../../models/Country/ICountryEditFormState.ts";


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
        addCountry: build.mutation<ICountry, FormData>({
            query: (formData) => ({
                url: 'Countries/Create',
                method: 'POST',
                body: formData,
            }),
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
            query: (formData) => {

                const body = new FormData();
                body.append("Id", formData.id.toString());
                body.append("Name", formData.name);
                body.append("Code", formData.code);
                body.append("Slug", formData.slug);

                if (formData.image) {

                    body.append("Image", formData.image as unknown as File);
                }

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