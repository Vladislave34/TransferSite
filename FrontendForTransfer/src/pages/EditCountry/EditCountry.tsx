import CountryEditForm from "../../UI/CountryEditForm/countryEditForm.tsx";
import {useLocation, useParams} from "react-router-dom";
import { useMemo} from "react";
import AuthLayout from "../../admin/pages/AuthPages/AuthPageLayout.tsx";



const EditCountry = () => {
    const {id} = useParams();
    const {state} = useLocation();

    const country = useMemo(()=>state, [state])


    return (
        <AuthLayout><CountryEditForm id={Number(id)} country={country} /></AuthLayout>


    );
};

export default EditCountry;