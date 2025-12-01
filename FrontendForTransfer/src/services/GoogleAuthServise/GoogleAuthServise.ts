import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import API_ENV from "../../env";
import type GoogleAuthCredential from "../../models/GoogleAuth/GoogleAuthCredential.ts";


export const googleApi = createApi({
    reducerPath: "googleAuthApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_ENV.API_BASE_URL}/api/auth/google/`,
    }),
    tagTypes: ['GoogleAuth'],
    endpoints: (build) => ({
        Login: build.mutation<void, GoogleAuthCredential>({
            query: (formData) => ({
                url: 'login',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['GoogleAuth'],
        })
    })

})