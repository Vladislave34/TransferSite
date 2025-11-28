
import {useNavigate,} from "react-router-dom";
import {countryApi} from "../../services/CountryService/CountryService.ts";
import {useFormik} from "formik";
import * as Yup from "yup";
import type ICountryEditFormState from "../../models/Country/ICountryEditFormState.ts";
import type {FC} from "react";
import type ICountry from "../../models/Country/ICountry.ts";

interface ICountryEditFormProps {
    id: number;
    country: ICountry;
}



const CountryEditForm:FC<ICountryEditFormProps>  = ({id, country}) => {

    const navigate = useNavigate();
    const [editCountry] = countryApi.useEditCountryMutation();
    const formik = useFormik({
        initialValues: {
            name: country.name,
            code: country.code,
            slug: country.slug,
            image: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "Name має містити мінімум 3 символи")
                .required("Name обов'язкове"),
            code: Yup.string()
                .matches(/^[a-z]{2,3}$/, "Code має містити 2-3 великі латинські літери")
                .required("Code обов'язковий"),
            slug: Yup.string()
                .matches(
                    /^[a-z0-9-]+$/,
                    "Slug може містити лише латинські букви, цифри та дефіс"
                )
                .required("Slug обов'язковий"),

        }),
        onSubmit: async (values, { resetForm }) => {
            const formData : ICountryEditFormState = {
                id: Number(id),
                name: values.name,
                code: values.code,
                slug: values.slug,

            };


            if (values.image) {
                formData.image =  values.image; // File
            }

            try {
                await editCountry(formData).unwrap();

                resetForm();
                navigate('/');
            } catch (err) {
                console.error(err);
            }



        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="
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
                overflow-y-auto
            "
        >
            <h2 className="text-2xl font-semibold mb-5 drop-shadow text-gray-900">
                Edit Country
            </h2>

            {/* Name */}
            <div className="mb-4 flex flex-col">
                <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-900">Name</label>
                <input
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Country name"
                    className="
                        bg-white/70 border border-gray-300 text-gray-900 text-sm rounded-xl
                        px-3 py-2.5 focus:ring-2 focus:ring-[#FFC8DD] focus:border-[#FFC8DD]
                        shadow-xs placeholder:text-gray-500 transition-all duration-300
                    "
                />
                {formik.touched.name && formik.errors.name && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.name}</div>
                )}
            </div>

            {/* Code */}
            <div className="mb-4 flex flex-col">
                <label htmlFor="code" className="mb-2 text-sm font-medium text-gray-900">Code</label>
                <input
                    id="code"
                    name="code"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Country code"
                    className="
                        bg-white/70 border border-gray-300 text-gray-900 text-sm rounded-xl
                        px-3 py-2.5 focus:ring-2 focus:ring-[#FFC8DD] focus:border-[#FFC8DD]
                        shadow-xs placeholder:text-gray-500 transition-all duration-300
                    "
                />
                {formik.touched.code && formik.errors.code && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.code}</div>
                )}
            </div>

            {/* Slug */}
            <div className="mb-4 flex flex-col">
                <label htmlFor="slug" className="mb-2 text-sm font-medium text-gray-900">Slug</label>
                <input
                    id="slug"
                    name="slug"
                    value={formik.values.slug}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="country-slug"
                    className="
                        bg-white/70 border border-gray-300 text-gray-900 text-sm rounded-xl
                        px-3 py-2.5 focus:ring-2 focus:ring-[#FFC8DD] focus:border-[#FFC8DD]
                        shadow-xs placeholder:text-gray-500 transition-all duration-300
                    "
                />
                {formik.touched.slug && formik.errors.slug && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.slug}</div>
                )}
            </div>

            {/* Image File */}
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
               Edit
            </button>
        </form>
    );
};

export default CountryEditForm;