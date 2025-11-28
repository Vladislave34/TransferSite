import {useLocation, useParams} from "react-router-dom";
import {useEffect, useMemo} from "react";
import DeleteCountryButton from "../../UI/DeleteCountryButton/DeleteCountryButton.tsx";
import EditCountryButton from "../../UI/EditCountryButton/EditCountryButton.tsx";


const CountryDetails = () => {
    const { id } = useParams();
    const {state} = useLocation();

    const country = useMemo(() => state, [state]);


    useEffect(()=>{
        console.log(id);
        console.log(state);
    })
    return (
        <div>
            <DeleteCountryButton id={Number(id)} />
            <EditCountryButton id={Number(id)} country={country} />
        </div>
    );
};

export default CountryDetails;