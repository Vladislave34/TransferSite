import {authApi} from "../../services/AuthService/AuthService.ts";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";

import * as Yup from "yup";
import type IUserLogin from "../../models/User/IUserLogin.ts";
import {useEffect} from "react";

import {useAppDispatch} from "../../hooks/redux.ts";
import {loginSuccess} from "../../store/reducers/authSlice.ts";


const LoginForm = () => {
    const dispatch = useAppDispatch();

    const [login] = authApi.useLoginMutation();
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate('/Profile');
        }
    }, []);
    const formik = useFormik<IUserLogin>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({

            email: Yup.string().email("Email is not correct").required("Email is required"),
            password: Yup.string().required("Password is required").min(6, "Password is short"),

        }),
        onSubmit: async (values) => {

            const jwt = await login(values)
                .unwrap();
            dispatch(loginSuccess(jwt.token));

            navigate('/Profile');



        }
    });
    return (
        <form className="
                overflow-y-auto
                max-w-sm w-full
                h-[350px]
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
                Login
            </h2>




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





            <button
                type="submit"
                className="
                    mt-auto px-4 py-2 rounded-xl font-medium
                    bg-[#BDE0FE] hover:bg-[#A2D2FF] text-gray-900 shadow-md
                    transition-all duration-300
                "
            >
                Login
            </button>
        </form>
    );
};

export default LoginForm;