import CountryEditForm from "../../UI/CountryEditForm/countryEditForm.tsx";
import {useLocation, useParams} from "react-router-dom";
import {useEffect} from "react";


const EditCountry = () => {
    const {id} = useParams();
    const {state} = useLocation();

    useEffect(() => {
        console.log(state);
    }, []);
    return (
        <div className="h-screen w-screen bg-[#F6ECFA] flex justify-center items-center">
            <CountryEditForm id={Number(id)} country={state} />
        </div>
    );
};

export default EditCountry;