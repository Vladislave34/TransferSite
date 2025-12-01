import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import API_ENV from "../../env";

import type ICity from "../../models/City/ICity.ts";
import type ICityAddFormState from "../../models/City/ICityAddFormState.ts";
import {serialize} from "object-to-formdata";



export const cityApi = createApi({
    reducerPath: "cityApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_ENV.API_BASE_URL}/api/`,
    }),
    tagTypes: ['City'],
    endpoints: (build) => ({
        fetchAllCities: build.query<ICity[], void>({
            query: ()=>({
                url: "Cities"
            }),
            providesTags : ["City"]
        }),
        addCity: build.mutation<ICity, ICityAddFormState>({
            query: (model) => {
                const formData = serialize(model)

                return {
                    url: "Cities/Create",
                    method: "POST",
                    body: formData,
                }

                },

            invalidatesTags: ["City"]
        })
    })
})