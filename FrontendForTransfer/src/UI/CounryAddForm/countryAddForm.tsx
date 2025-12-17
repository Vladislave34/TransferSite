import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { countryApi } from "../../services/CountryService/CountryService.ts";
import type ICountryCreateFormState from "../../models/Country/ICountryCreateFormState.ts";
import Label from "../../admin/components/form/Label";
import Input from "../../admin/components/form/input/InputField";
import Button from "../../admin/components/ui/button/Button";
import Checkbox from "../../admin/components/form/input/Checkbox";

const CountryAddForm = () => {
    const navigate = useNavigate();
    const [addCountry] = countryApi.useAddCountryMutation();
    const [isChecked, setIsChecked] = useState(false);

    const formik = useFormik<ICountryCreateFormState>({
        initialValues: {
            name: "",
            code: "",
            slug: "",
            image: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "Name має містити мінімум 3 символи")
                .required("Name обов'язкове"),
            code: Yup.string()
                .matches(/^[a-z]{1,3}$/, "Code має містити 1-3 великі латинські літери")
                .required("Code обов'язковий"),
            slug: Yup.string()
                .matches(/^[a-z0-9-]+$/, "Slug може містити лише латинські букви, цифри та дефіс")
                .required("Slug обов'язковий"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await addCountry(values).unwrap();
                resetForm();
                navigate("/");
            } catch (err) {
                console.error(err);
            }
        },
    });

    return (
        <div className="flex flex-col flex-1 min-h-screen">
            {/* Back link */}
            <div className="w-full max-w-md pt-10 mx-auto">
                <Link
                    to="/"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                    &#8592; Back to dashboard
                </Link>
            </div>

            {/* Form container */}
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div className="mb-5">
                    <h1 className="mb-2 font-semibold text-gray-800 text-title-md">
                        Create New Country
                    </h1>
                    <p className="text-sm text-gray-500">
                        Fill out the form to add a new country.
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-5">
                        {/* Name */}
                        <div>
                            <Label>Name</Label>
                            <Input
                                name="name"
                                placeholder="Country name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-error-500 text-sm mt-1">{formik.errors.name}</p>
                            )}
                        </div>

                        {/* Code */}
                        <div>
                            <Label>Code</Label>
                            <Input
                                name="code"
                                placeholder="Country code"
                                value={formik.values.code}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.code && formik.errors.code && (
                                <p className="text-error-500 text-sm mt-1">{formik.errors.code}</p>
                            )}
                        </div>

                        {/* Slug */}
                        <div>
                            <Label>Slug</Label>
                            <Input
                                name="slug"
                                placeholder="country-slug"
                                value={formik.values.slug}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.slug && formik.errors.slug && (
                                <p className="text-error-500 text-sm mt-1">{formik.errors.slug}</p>
                            )}
                        </div>

                        {/* Image */}
                        <div>
                            <Label>Upload Image</Label>
                            <Input
                                type="file"
                                name="image"

                                onChange={(e) => {
                                    if (e.currentTarget.files && e.currentTarget.files[0]) {
                                        formik.setFieldValue("image", e.currentTarget.files[0]);
                                    }
                                }}
                            />
                            {formik.touched.image && formik.errors.image && (
                                <p className="text-error-500 text-sm mt-1">{formik.errors.image}</p>
                            )}
                        </div>

                        {/* Optional Active Checkbox */}
                        <div className="flex items-center gap-3">
                            <Checkbox checked={isChecked} onChange={setIsChecked} />
                            <span className="text-gray-700 text-sm">Active</span>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <Button  className="w-full" size="sm">
                                Create
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CountryAddForm;