import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import API_ENV from "../../env";
import type {LoginSuccess} from "../../models/User/LoginSuccess.ts";


export const googleApi = createApi({
    reducerPath: "googleAuthApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_ENV.API_BASE_URL}/api/Account/`,
    }),
    tagTypes: ['GoogleAuth'],
    endpoints: (build) => ({
        Login: build.mutation<LoginSuccess, string>({
            query: (formData) => ({
                url: 'GoogleLogin',
                method: 'POST',
                body: {idToken : formData},
            }),
            invalidatesTags: ['GoogleAuth'],
        })
    })

})