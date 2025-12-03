import { useFormik } from "formik";
import * as Yup from "yup";

import { authApi } from "../../services/AuthService/AuthService.ts";
import type IUserRegister from "../../models/User/IUserRegister.ts";
import {useNavigate} from "react-router-dom";



const RegisterForm = () => {
    const [register] = authApi.useRegisterMutation();
    const navigate = useNavigate();

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
            email: Yup.string().email("Email is not correct").required("Email is required"),
            password: Yup.string().required("Password is required").min(6, "Password is short"),

        }),
        onSubmit: async (values) => {

            const jwt = await register(values)
                .unwrap();
            localStorage.setItem("token", jwt.token);
            navigate('/');



        }
    });
    return (
        <form className="
                overflow-y-auto
                max-w-sm w-full
                h-[500px]
                flex flex-col
                overflow-hidden
                rounded-3xl
                shadow-lg hover:shadow-xl
                transition-all duration-300
                bg-gradient-to-b
                from-[#CDB4DB]
                via-[#FFC8DD]
                to-[#A2D2FF]
                border border-white/20
                p-5
            "
              onSubmit={formik.handleSubmit}
        >
            <h2 className="text-2xl font-semibold mb-5 drop-shadow text-gray-900">
                Register
            </h2>

            <div className="mb-4 flex flex-col">
                <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-900">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="First Name"
                    className="
                        bg-white/70 border border-gray-300 text-gray-900 text-sm rounded-xl
                        px-3 py-2.5 focus:ring-2 focus:ring-[#FFC8DD] focus:border-[#FFC8DD]
                        shadow-xs placeholder:text-gray-500 transition-all duration-300
                    "
                />
                {formik.touched.firstName && formik.errors.firstName && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.firstName}</div>
                )}
            </div>

            <div className="mb-4 flex flex-col">
                <label htmlFor="slug" className="mb-2 text-sm font-medium text-gray-900">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Last Name"
                    className="
                        bg-white/70 border border-gray-300 text-gray-900 text-sm rounded-xl
                        px-3 py-2.5 focus:ring-2 focus:ring-[#FFC8DD] focus:border-[#FFC8DD]
                        shadow-xs placeholder:text-gray-500 transition-all duration-300
                    "
                />
                {formik.touched.lastName && formik.errors.lastName && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.lastName}</div>
                )}
            </div>
            <div className="mb-4 flex flex-col">
                <label htmlFor="slug" className="mb-2 text-sm font-medium text-gray-900">Email</label>
                <input
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Email"
                    className="
                        bg-white/70 border border-gray-300 text-gray-900 text-sm rounded-xl
                        px-3 py-2.5 focus:ring-2 focus:ring-[#FFC8DD] focus:border-[#FFC8DD]
                        shadow-xs placeholder:text-gray-500 transition-all duration-300
                    "
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
                )}
            </div>
            <div className="mb-4 flex flex-col">
                <label htmlFor="slug" className="mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Password"
                    className="
                        bg-white/70 border border-gray-300 text-gray-900 text-sm rounded-xl
                        px-3 py-2.5 focus:ring-2 focus:ring-[#FFC8DD] focus:border-[#FFC8DD]
                        shadow-xs placeholder:text-gray-500 transition-all duration-300
                    "
                />
                {formik.touched.password && formik.errors.password && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.password}</div>
                )}
            </div>


            <div className="mb-4 flex flex-col">
                <label htmlFor="image" className="mb-2 text-sm font-medium text-gray-900">Upload Image</label>
                <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        if (event.currentTarget.files && event.currentTarget.files[0]) {
                            formik.setFieldValue("image", event.currentTarget.files[0]);
                        }
                    }}
                    onBlur={formik.handleBlur}

                    className="
            bg-white/70 border border-gray-300 text-gray-900 text-sm rounded-xl
            px-3 py-2.5 focus:ring-2 focus:ring-[#FFC8DD] focus:border-[#FFC8DD]
            shadow-xs placeholder:text-gray-500 transition-all duration-300
        "
                />
                {formik.touched.image && formik.errors.image && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.image}</div>
                )}
            </div>

            <button
                type="submit"
                className="
                    mt-auto px-4 py-2 rounded-xl font-medium
                    bg-[#BDE0FE] hover:bg-[#A2D2FF] text-gray-900 shadow-md
                    transition-all duration-300
                "
            >
                Register
            </button>
        </form>
    );
};

export default RegisterForm;