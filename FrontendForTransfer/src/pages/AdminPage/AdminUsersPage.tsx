import PageMeta from "../../admin/components/common/PageMeta.tsx";
import PageBreadcrumb from "../../admin/components/common/PageBreadCrumb.tsx";
import ComponentCard from "../../admin/components/common/ComponentCard.tsx";
import AdminUsersList from "../../components/AdminUsersList/AdminUsersList.tsx";
import AdminSearchUsersForm from "../../UI/AdminSearchUsersForm/AdminSearchUsersForm.tsx";


import Pagination from "../../components/Pagination/Pagination.tsx";
import {createPages} from "../../helpers/pageCreator.ts";

import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {setTotalPages, setUsers} from "../../store/reducers/paginationSlice.ts";
import {authorizedUserApi} from "../../services/AuthorizedUser/AuthorizedUserService.ts";
import {useEffect} from "react";



const AdminUsersPage = () => {
    const dispatch = useAppDispatch();

    const {
        users,
        totalPages,
        currentPage,
        formParams,
    } = useAppSelector(state => state.paginationReducer);

    const pages: number[] = [];
    createPages(pages, totalPages, currentPage);

    const { data } = authorizedUserApi.useSearchUserQuery(formParams!, {
        skip: !formParams,
    });


    useEffect(() => {
        if (data) {
            dispatch(setTotalPages(data.pagination.totalPages));
            dispatch(setUsers(data.items));
        }
    }, [data, dispatch]);



    return (
        <>
            <PageMeta
                title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Basic Tables" />
            <div className="space-y-6">
                <ComponentCard title="Basic Table 1">
                < AdminSearchUsersForm  />

                <AdminUsersList users={users}  />
                    {users.length > 0 && (
                        <Pagination pages={pages}   />
                    )}

                </ComponentCard>
            </div>
        </>
    );
};

export default AdminUsersPage;