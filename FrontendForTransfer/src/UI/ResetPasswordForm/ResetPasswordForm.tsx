import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {Link, useNavigate, useSearchParams} from "react-router-dom";

import Label from "../../admin/components/form/Label";
import Input from "../../admin/components/form/input/InputField";
import Button from "../../admin/components/ui/button/Button";
import { EyeIcon, EyeCloseIcon } from "../../admin/icons";
import type IResetPasswordForm from "../../models/User/IResetPasswordForm.ts";
import type {IResetPassword} from "../../models/User/IResetPassword.ts";
import {authApi} from "../../services/AuthService/AuthService.ts";



const NewPasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetPassword] = authApi.useResetPasswordMutation();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const token  = searchParams.get("token");
    const email  = searchParams.get("email");

    const formik = useFormik<IResetPasswordForm>({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords do not match")
                .required("Confirm password is required"),
        }),
        onSubmit: (values) => {
            if (!email || !token) return;
            const data: IResetPassword = {
                email: email,
                token: token,
                newPassword: values.password,
                confirmNewPassword: values.confirmPassword,

            }
            console.log(data);
            resetPassword(data);
            navigate("/Login");

        },
    });

    return (
        <div className="flex flex-col justify-center w-full max-w-md mx-auto">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-md">
                Create new password
            </h1>
            <p className="mb-6 text-sm text-gray-500">
                Your new password must be different from previously used passwords
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* New Password */}
                <div>
                    <Label>
                        New Password <span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter new password"
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

                {/* Confirm Password */}
                <div>
                    <Label>
                        Confirm Password <span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}

                        />
                        <span
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                        >
                            {showConfirmPassword ? (
                                <EyeIcon className="size-5 fill-gray-500" />
                            ) : (
                                <EyeCloseIcon className="size-5 fill-gray-500" />
                            )}
                        </span>
                    </div>
                    {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword && (
                            <p className="text-error-500 text-sm mt-1">
                                {formik.errors.confirmPassword}
                            </p>
                        )}
                </div>

                <Button  className="w-full" size="sm">
                    Reset Password
                </Button>
            </form>

            <p className="mt-5 text-sm text-center text-gray-700">
                Remember your password?{" "}
                <Link to="/login" className="text-brand-500 hover:text-brand-600">
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default NewPasswordForm;