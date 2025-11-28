import CountryEditForm from "../../UI/CountryEditForm/countryEditForm.tsx";
import {useLocation, useParams} from "react-router-dom";
import { useMemo} from "react";



const EditCountry = () => {
    const {id} = useParams();
    const {state} = useLocation();

    const country = useMemo(()=>state, [state])


    return (
        <div className="h-screen w-screen bg-[#F6ECFA] flex justify-center items-center">
            <CountryEditForm id={Number(id)} country={country} />
        </div>
    );
};

export default EditCountry;