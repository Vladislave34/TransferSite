import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { authApi } from "../../services/AuthService/AuthService";
import type IUserRegister from "../../models/User/IUserRegister";
import {ChevronLeftIcon, EyeCloseIcon, EyeIcon} from "../../admin/icons";
import Label from "../../admin/components/form/Label";
import Input from "../../admin/components/form/input/InputField.tsx";
import Checkbox from "../../admin/components/form/input/Checkbox.tsx";
import {loginSuccess} from "../../store/reducers/authSlice.ts";
import {useAppDispatch} from "../../hooks/redux.ts";


// import { EyeCloseIcon, EyeIcon, ChevronLeftIcon } from "../../icons";
// import Label from "../form/Label";
// import Input from "../form/input/InputField";
// import Checkbox from "../form/input/Checkbox";

const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [register] = authApi.useRegisterMutation();

    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const formik = useFormik<IUserRegister>({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            image: null,
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            email: Yup.string()
                .email("Email is not correct")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password is too short")
                .required("Password is required"),
        }),
        onSubmit: async (values) => {
            const jwt = await register(values).unwrap();

            dispatch(loginSuccess(jwt.token));
            navigate("/");
        },
    });

    return (
        <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
            <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
                <Link
                    to="/"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                    <ChevronLeftIcon className="size-5" />
                    Back to dashboard
                </Link>
            </div>

            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div className="mb-8">
                    <h1 className="mb-2 text-title-md font-semibold text-gray-800">
                        Sign Up
                    </h1>
                    <p className="text-sm text-gray-500">
                        Enter your details to create an account
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    {/* First & Last name */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <Label>First Name *</Label>
                            <Input
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                placeholder="Enter first name"
                            />
                            {formik.touched.firstName && formik.errors.firstName && (
                                <p className="text-error-500 text-sm">
                                    {formik.errors.firstName}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Last Name *</Label>
                            <Input
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                placeholder="Enter last name"
                            />
                            {formik.touched.lastName && formik.errors.lastName && (
                                <p className="text-error-500 text-sm">
                                    {formik.errors.lastName}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <Label>Email *</Label>
                        <Input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            placeholder="Enter your email"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-error-500 text-sm">
                                {formik.errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <Label>Password *</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                placeholder="Enter password"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                            >
                {showPassword ? (
                    <EyeIcon className="size-5 fill-gray-500" />
                ) : (
                    <EyeCloseIcon className="size-5 fill-gray-500" />
                )}
              </span>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-error-500 text-sm">
                                {formik.errors.password}
                            </p>
                        )}
                    </div>

                    {/* Image */}
                    <div>
                        <Label>Avatar</Label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                formik.setFieldValue("image", e.currentTarget.files?.[0])
                            }
                            className="w-full text-sm"
                        />
                    </div>

                    {/* Terms */}
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={isChecked}
                            onChange={setIsChecked}
                            className="w-5 h-5"
                        />
                        <p className="text-sm text-gray-500">
                            I agree to the{" "}
                            <span className="text-gray-800">Terms</span> and{" "}
                            <span className="text-gray-800">Privacy Policy</span>
                        </p>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={!isChecked}
                        className="w-full py-3 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-50"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-5 text-sm text-center text-gray-700">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-brand-500 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;