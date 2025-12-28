import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ISearchedUser} from "../../models/User/ISearchedUser.ts";
import type {IUserSearchForm} from "../../models/User/IUserSearchForm.ts";

interface IPaginationState {
    currentPage: number;
    totalPages: number;
    users: ISearchedUser[];
    formParams: IUserSearchForm | null;

}


const initialState : IPaginationState = {
    currentPage: 1,
    totalPages: 0,
    users: [],
    formParams: null
}

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
        setUsers: (state, action: PayloadAction<ISearchedUser[]>) => {
            state.users = action.payload;
        },
        setFormParams: (state, action: PayloadAction<IUserSearchForm>) => {

            state.formParams = action.payload;
        }
    }
})
export const {setCurrentPage, setTotalPages, setUsers, setFormParams} = paginationSlice.actions;
export default paginationSlice.reducer;