import { useFormik } from "formik";
import * as Yup from "yup";

import Label from "../../admin/components/form/Label";
import Input from "../../admin/components/form/input/InputField";
import Button from "../../admin/components/ui/button/Button";
import type {IUserSearchForm} from "../../models/User/IUserSearchForm.ts";

import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {setFormParams} from "../../store/reducers/paginationSlice.ts";



const AdminSearchUsersForm  = ( ) => {
    const dispatch = useAppDispatch();

    const curPage = useAppSelector(state => state.paginationReducer.currentPage);
    const formik = useFormik<IUserSearchForm>({
        initialValues: {
            name: "",
            startDate: "",
            endDate: "",
            page: curPage,
            itemPerPage: 10,
        },
        validationSchema: Yup.object({
            name: Yup.string(),
            startDate: Yup.date().nullable(),
            endDate: Yup.date()
                .nullable()
                .min(Yup.ref("startDate"), "End date must be after start date"),
            page: Yup.number().min(1),
            itemPerPage: Yup.number().min(1).max(100),
        }),
        onSubmit: async (values) => {
            try {



                dispatch(setFormParams(values));
            } catch (e) {
                console.error("Search failed", e);
            }
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]"
        >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Search users
            </h2>

            {/* Name */}
            <div>
                <Label>Name</Label>
                <Input
                    name="name"
                    placeholder="Влад"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <Label>Start Date</Label>
                    <Input
                        type="datetime-local"
                        name="startDate"
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                    />
                </div>

                <div>
                    <Label>End Date</Label>
                    <Input
                        type="datetime-local"
                        name="endDate"
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                    />
                </div>
            </div>

            {/* Pagination */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <Label>Page</Label>
                    <Input
                        type="number"
                        name="page"

                        value={formik.values.page}
                        onChange={formik.handleChange}
                    />
                </div>

                <div>
                    <Label>Items per page</Label>
                    <Input
                        type="number"
                        name="itemPerPage"

                        value={formik.values.itemPerPage}
                        onChange={formik.handleChange}
                    />
                </div>
            </div>

            {/* Button */}
            <Button  className="w-full" size="sm">
                Search
            </Button>
        </form>
    );
};

export default AdminSearchUsersForm;