import {countryApi} from "../../services/CountryService/CountryService.ts";
import type {FC} from "react";
import {useNavigate} from "react-router-dom";

interface DeleteCountryButtonProps {
    id: number;
}
const DeleteCountryButton:FC<DeleteCountryButtonProps> = ({ id } ) => {
    const [deleteCountry] = countryApi.useDeleteCountryMutation();
    const navigate = useNavigate();
    return (

        <div>
            <button type="button"
                    className="
                    cursor-pointer
                        px-4 py-2
                        rounded-xl
                        font-medium
                        bg-[#BDE0FE]
                        hover:bg-[#A2D2FF]
                        text-gray-900
                        shadow-md
                        transition-all duration-300"
                    onClick={()=>{
                        deleteCountry(id);
                        navigate("/Home")
                    }}

            >
                DELETE
            </button>

        </div>
    );
};

export default DeleteCountryButton;