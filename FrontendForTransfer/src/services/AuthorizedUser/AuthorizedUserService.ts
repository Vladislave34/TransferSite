import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import API_ENV from "../../env";
import type IUser from "../../models/User/IUser.ts";


import type {IUserSearchForm} from "../../models/User/IUserSearchForm.ts";
import type ISearchedResult from "../../models/User/ISearchedUser.ts";



export const authorizedUserApi = createApi({
    reducerPath: "authorizedUser",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_ENV.API_BASE_URL}/api/Account/`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        }
    }),
    tagTypes: ['AuthUser'],
    endpoints: (build) => ({
        GetUser: build.query<IUser, void>({
            query: ()=> ({
                url: "GetProfile",
                method: "GET"
            }),
            providesTags: ['AuthUser']
        }),
        SearchUser: build.query<ISearchedResult, IUserSearchForm>({
            query: ({ name, startDate, endDate,  page = 1, itemPerPage = 7 }) => ({
                url: "Search",
                method: "GET",
                params: {
                    name: name,
                    startDate,
                    endDate,
                    page: page,
                    itemPerPage: itemPerPage,
                },
            }),
        })
    })
})