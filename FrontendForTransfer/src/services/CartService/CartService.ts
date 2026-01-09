import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import API_ENV from "../../env";

import type ICartItem from "../../models/Cart/ICartItem.ts";
import type ICartAddUpdate from "../../models/Cart/ICartAddUpdate.ts";



export const cartApi = createApi({
    reducerPath: "cartApi",
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
    tagTypes: ["Cart"],
    endpoints: (build) => ({
        fetchAllCarts: build.query<ICartItem[], void>({
            query: () => ({
                url: "Carts/GetList"
            }),
            providesTags: ["Cart"]
        }),
        addUpdateCart: build.mutation<void, ICartAddUpdate>({
            query: (formData) => ({
                url: 'Carts/AddUpdate',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Cart'],
        })
    })
})