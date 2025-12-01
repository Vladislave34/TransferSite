import {Editor} from "@tinymce/tinymce-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {countryApi} from "../../services/CountryService/CountryService.ts";
import {cityApi} from "../../services/CityService/CityService.ts";
import type ICityAddFormState from "../../models/City/ICityAddFormState.ts";



const AddCityForm = () => {
    const [addCity] = cityApi.useAddCityMutation()
    const { data } = countryApi.useFetchAllCountriesQuery()
    const formik = useFormik<ICityAddFormState>({
        initialValues: {
            name: "",
            description: "",
            slug: "",
            image: null, // File | null
            countryId: "", // string для select
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Назва міста не може бути порожньою").max(100),
            countryId: Yup.number()
                .typeError("Країна повинна бути вказана")
                .required("Країна повинна бути вказана")
                .moreThan(0, "ID країни має бути більшим за 0"),
            slug: Yup.string().required("Slug міста не може бути порожнім").max(100),
            description: Yup.string().nullable(),

        }),
        onSubmit: (values) => {


            addCity(values)
                .unwrap()
                .then(() => alert("Місто створено!"))
                .catch((err) => console.error(err));
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
                Create New City
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
            <div className="mb-4 flex flex-col">
                <label
                    htmlFor="countryId"
                    className="mb-2 text-sm font-medium text-gray-900"
                >
                    Country
                </label>

                <select
                    id="countryId"
                    name="countryId"
                    value={formik.values.countryId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="
            bg-white/70 border border-gray-300 text-gray-900 text-sm rounded-xl
            px-3 py-2.5 focus:ring-2 focus:ring-[#FFC8DD] focus:border-[#FFC8DD]
            shadow-xs transition-all duration-300
        "
                >
                    <option value="">Select a country...</option>

                    {data?.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                {formik.touched.countryId && formik.errors.countryId && (
                    <div className="text-red-600 text-sm mt-1">
                        {formik.errors.countryId}
                    </div>
                )}
            </div>
            {/* Description */}
            <div className="mb-4 flex flex-col">
                <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-900">
                    Description
                </label>

                <div
                    className="
                        bg-white/70 border border-gray-300 text-gray-900 rounded-xl
                        shadow-xs transition-all duration-300
                        "
                >


                <Editor
                    id="description"
                    apiKey="5b2hef35g473xkepy710bbibghg2keh667rd0ciqxx4r7o8s"
                    value={formik.values.description}
                    onEditorChange={(content) => formik.setFieldValue("description", content)}

                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            "advlist", "autolink", "lists", "link", "image", "charmap",
                            "preview", "anchor", "searchreplace", "visualblocks", "code",
                            "fullscreen", "insertdatetime", "media", "table", "paste",
                            "help", "wordcount"
                        ],
                        toolbar:
                            "undo redo | bold italic underline | " +
                            "alignleft aligncenter alignright alignjustify | " +
                            "bullist numlist outdent indent | removeformat | help",
                        content_style:
                            "body { font-family:Inter, sans-serif; font-size:14px }"
                    }}


                />
                </div>
                {formik.touched.description && formik.errors.description && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.description}</div>
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
                Create
            </button>
        </form>

    );
};

export default AddCityForm;