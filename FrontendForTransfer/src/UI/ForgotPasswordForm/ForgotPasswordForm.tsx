import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import Label from "../../admin/components/form/Label";
import Input from "../../admin/components/form/input/InputField";
import Button from "../../admin/components/ui/button/Button";
import {authApi} from "../../services/AuthService/AuthService.ts";
import type IForgotPassword from "../../models/User/IForgotPassword.ts";



const EmailOnlyForm = () => {
    const [forgotPassword] = authApi.useForgotPasswordMutation();
    const formik = useFormik<IForgotPassword>({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Email is not correct")
                .required("Email is required"),
        }),
        onSubmit: (values) => {

            forgotPassword(values);
            // console.log("Email:", values.email);
            // // тут можеш викликати API (reset password / confirm email)
        },
    });

    return (
        <div className="flex flex-col justify-center w-full max-w-md mx-auto">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-md">
                Enter your email
            </h1>
            <p className="mb-6 text-sm text-gray-500">
                We will send you further instructions
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
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

                <Button className="w-full" size="sm">
                    Continue
                </Button>
            </form>

            <p className="mt-5 text-sm text-center text-gray-700">
                Remembered your password?{" "}
                <Link to="/login" className="text-brand-500 hover:text-brand-600">
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default EmailOnlyForm;