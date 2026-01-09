import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import API_ENV from "../../env";

import type ITransportation from "../../models/Transportation/ITransportation.ts";


export const transportationApi = createApi({
    reducerPath: "transportation",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_ENV.API_BASE_URL}/api/`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        }
    }),
    tagTypes: ["Transportation"],
    endpoints: (build) => ({
        fetchAllTransportations: build.query<ITransportation[], void>({
            query: () => ({
                url: "Transportation/GetList",
            }),
            providesTags: ["Transportation"],
        }),
    }),
});

