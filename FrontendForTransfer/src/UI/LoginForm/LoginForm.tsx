import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { authApi } from "../../services/AuthService/AuthService";
import type IUserLogin from "../../models/User/IUserLogin";

import { useAppDispatch } from "../../hooks/redux";
import { loginSuccess } from "../../store/reducers/authSlice";
import {ChevronLeftIcon, EyeCloseIcon, EyeIcon} from "../../admin/icons";
import Label from "../../admin/components/form/Label.tsx";
import Input from "../../admin/components/form/input/InputField.tsx";
import Checkbox from "../../admin/components/form/input/Checkbox.tsx";
import Button from "../../admin/components/ui/button/Button.tsx";



const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [login] = authApi.useLoginMutation();

    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/Profile");
        }
    }, [navigate]);

    const formik = useFormik<IUserLogin>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Email is not correct")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password is too short")
                .required("Password is required"),
        }),
        onSubmit: async (values) => {
            const jwt = await login(values).unwrap();
            dispatch(loginSuccess(jwt.token));

            if (isChecked) {
                localStorage.setItem("token", jwt.token);
            }

            navigate("/Profile");
        },
    });

    return (
        <div className="flex flex-col flex-1">
            {/* Back */}
            <div className="w-full max-w-md pt-10 mx-auto">
                <Link
                    to="/"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                    <ChevronLeftIcon className="size-5" />
                    Back to dashboard
                </Link>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div className="mb-8">
                    <h1 className="mb-2 font-semibold text-gray-800 text-title-md">
                        Sign In
                    </h1>
                    <p className="text-sm text-gray-500">
                        Enter your email and password to sign in!
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <Label>
                            Email <span className="text-error-500">*</span>
                        </Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="info@gmail.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}

                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-error-500 text-sm mt-1">
                                {formik.errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <Label>
                            Password <span className="text-error-500">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={formik.values.password}
                                onChange={formik.handleChange}

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
                            <p className="text-error-500 text-sm mt-1">
                                {formik.errors.password}
                            </p>
                        )}
                    </div>

                    {/* Options */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Checkbox checked={isChecked} onChange={setIsChecked} />
                            <span className="text-sm text-gray-700">
                Keep me logged in
              </span>
                        </div>

                        <Link
                            to="/reset-password"
                            className="text-sm text-brand-500 hover:text-brand-600"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Button */}
                    <Button  className="w-full" size="sm">
                        Sign In
                    </Button>
                </form>

                {/* Footer */}
                <p className="mt-5 text-sm text-center text-gray-700">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/Register"
                        className="text-brand-500 hover:text-brand-600"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;