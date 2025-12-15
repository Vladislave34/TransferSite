import {useLocation, useParams} from "react-router-dom";
import {useEffect, useMemo} from "react";
import DeleteCountryButton from "../../UI/DeleteCountryButton/DeleteCountryButton.tsx";
import EditCountryButton from "../../UI/EditCountryButton/EditCountryButton.tsx";
import {useAppSelector} from "../../hooks/redux.ts";


const CountryDetails = () => {
    const { id } = useParams();
    const {state} = useLocation();

    const country = useMemo(() => state, [state]);
    const user = useAppSelector(state => state.authReducer.user)

    useEffect(()=>{
        console.log(id);
        console.log(state);
    })

    const isAdmin =
        user?.role &&
        (
            (Array.isArray(user.role) && user.role.includes("Admin")) ||
            (typeof user.role === "string" && user.role === "Admin")
        );
    return (
        <div>
            {isAdmin && (
                <>
                    <DeleteCountryButton id={Number(id)} />
                    <EditCountryButton id={Number(id)} country={country} />
                </>

            )}

        </div>
    );
};

export default CountryDetails;