import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { countryApi } from "../../services/CountryService/CountryService.ts";
import { cityApi } from "../../services/CityService/CityService.ts";
import type ICityAddFormState from "../../models/City/ICityAddFormState.ts";
import Label from "../../admin/components/form/Label";
import Input from "../../admin/components/form/input/InputField";
import Button from "../../admin/components/ui/button/Button";
import { Editor } from "@tinymce/tinymce-react";

const AddCityForm = () => {
    const [addCity] = cityApi.useAddCityMutation();
    const { data } = countryApi.useFetchAllCountriesQuery();
    const [isChecked, setIsChecked] = useState(false);

    const formik = useFormik<ICityAddFormState>({
        initialValues: {
            name: "",
            slug: "",
            description: "",
            image: null,
            countryId: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Назва міста не може бути порожньою").max(100),
            slug: Yup.string().required("Slug міста не може бути порожнім").max(100),
            countryId: Yup.number()
                .typeError("Країна повинна бути вказана")
                .required("Країна повинна бути вказана")
                .moreThan(0, "ID країни має бути більшим за 0"),
            description: Yup.string().nullable(),
        }),
        onSubmit: (values) => {
            addCity(values)
                .unwrap()
                .then(() => alert("Місто створено!"))
                .catch((err) => console.error(err));
        },
    });

    return (
        <div className="flex flex-col flex-1 min-h-screen">
            

            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div className="mb-5">
                    <h1 className="mb-2 font-semibold text-gray-800 text-title-md">
                        Create New City
                    </h1>
                    <p className="text-sm text-gray-500">Fill out the form to add a new city.</p>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-5">
                        {/* Name */}
                        <div>
                            <Label>Name</Label>
                            <Input
                                name="name"
                                placeholder="City name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-error-500 text-sm mt-1">{formik.errors.name}</p>
                            )}
                        </div>

                        {/* Slug */}
                        <div>
                            <Label>Slug</Label>
                            <Input
                                name="slug"
                                placeholder="city-slug"
                                value={formik.values.slug}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.slug && formik.errors.slug && (
                                <p className="text-error-500 text-sm mt-1">{formik.errors.slug}</p>
                            )}
                        </div>

                        {/* Country select */}
                        <div>
                            <Label>Country</Label>
                            <select
                                name="countryId"
                                value={formik.values.countryId}
                                onChange={formik.handleChange}
                                className="bg-white/70 border border-gray-300 text-gray-900 text-sm rounded-xl px-3 py-2.5 shadow-xs transition-all duration-300 w-full"
                            >
                                <option value="">Select a country...</option>
                                {data?.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.countryId && formik.errors.countryId && (
                                <p className="text-error-500 text-sm mt-1">{formik.errors.countryId}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <Label>Description</Label>
                            <div className="bg-white/70 border border-gray-300 rounded-xl shadow-xs p-1">
                                <Editor
                                    apiKey="5b2hef35g473xkepy710bbibghg2keh667rd0ciqxx4r7o8s"
                                    value={formik.values.description}
                                    onEditorChange={(content) => formik.setFieldValue("description", content)}
                                    init={{
                                        height: 200,
                                        menubar: false,
                                        plugins: [
                                            "advlist autolink lists link image charmap preview anchor",
                                            "searchreplace visualblocks code fullscreen insertdatetime media table paste help wordcount"
                                        ],
                                        toolbar:
                                            "undo redo | bold italic underline | " +
                                            "alignleft aligncenter alignright alignjustify | " +
                                            "bullist numlist outdent indent | removeformat | help",
                                        content_style: "body { font-family:Inter, sans-serif; font-size:14px }"
                                    }}
                                />
                            </div>
                            {formik.touched.description && formik.errors.description && (
                                <p className="text-error-500 text-sm mt-1">{formik.errors.description}</p>
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

                        {/* Optional checkbox */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                            />
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

export default AddCityForm;