import {useNavigate} from "react-router-dom";
import type {FC} from "react";
import type ICountry from "../../models/Country/ICountry.ts";

interface EditCountryButtonProps {
    id: number;
    country: ICountry;
}
const EditCountryButton:FC<EditCountryButtonProps> = ({id, country}) => {

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

                        navigate(`/EditCountry/${id}`, {state: country})
                    }}

            >
                Edit
            </button>

        </div>
    );
};

export default EditCountryButton;