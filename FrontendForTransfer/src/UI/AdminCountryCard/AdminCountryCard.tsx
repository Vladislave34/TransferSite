import type ICountry from "../../models/Country/ICountry.ts";
import type {FC} from "react";
import { useNavigate} from "react-router-dom";
import API_ENV from "../../env";
import DeleteCountryButton from "../DeleteCountryButton/DeleteCountryButton.tsx";

import EditCountryButton from "../EditCountryButton/EditCountryButton.tsx";

interface CountryCardProps {
    Country: ICountry;
}

const CountryCard : FC<CountryCardProps>  = ({Country}) => {

    const navigate = useNavigate();
    return (
        <div
            className="
    max-w-sm w-full
    h-[360px]
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
    "
            onClick={()=>{
                navigate(`/Country/${Country.id}`, { state: { Country } })
            }}
    >
    <figure className="overflow-hidden h-48">
    <img
        src={`${API_ENV.API_BASE_URL}/images/${Country.image}`}
    alt={Country.name}
    className="
    w-full h-full object-cover
    hover:scale-110
    transition-transform duration-500
    "
    />
    </figure>

    <div className="p-5 flex flex-col flex-grow text-gray-900">
    <h5 className="text-xl font-semibold mb-2 drop-shadow">
        {Country.name}
        </h5>

        <p className="mb-4 text-sm tracking-wide uppercase opacity-90">
        {Country.code}
        </p>
        {Country !== null && Country.id !== undefined && (
            <div className="mt-auto flex justify-around">
                <DeleteCountryButton id={Country.id} />
                <EditCountryButton id={Country.id} country={Country} />
            </div>
        )}


    </div>
    </div>
);
};

export default CountryCard;