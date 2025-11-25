import {useLocation, useParams} from "react-router-dom";
import {useEffect} from "react";
import DeleteCountryButton from "../../UI/DeleteCountryButton/DeleteCountryButton.tsx";
import EditCountryButton from "../../UI/EditCountryButton/EditCountryButton.tsx";


const CountryDetails = () => {
    const { id } = useParams();
    const {state} = useLocation();


    useEffect(()=>{
        console.log(id);
        console.log(state);
    })
    return (
        <div>
            <DeleteCountryButton id={Number(id)} />
            <EditCountryButton id={Number(id)} country={state} />
        </div>
    );
};

export default CountryDetails;