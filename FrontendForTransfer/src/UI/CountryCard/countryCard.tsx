import type ICountry from "../../models/Country/ICountry";
import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import API_ENV from "../../env";
import Button from "../../admin/components/ui/button/Button";

interface CountryCardProps {
    Country: ICountry;
}

const CountryCard: FC<CountryCardProps> = ({ Country }) => {
    const navigate = useNavigate();

    return (
        <div className="
            w-full max-w-sm
            bg-white
            dark:bg-gray-900
            rounded-2xl
            shadow-lg hover:shadow-xl
            transition-all duration-300
            overflow-hidden
            border border-gray-800
        ">
            {/* Image */}
            <div className="h-48 overflow-hidden">
                <img
                    src={`${API_ENV.API_BASE_URL}/images/${Country.image}`}
                    alt={Country.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col">
                <h3 className="text-lg font-semibold text-grey-200 dark:text-white">
                    {Country.name}
                </h3>

                <p className="text-sm text-gray-400 mt-1 uppercase tracking-wide">
                    {Country.code}
                </p>

                <div className="mt-4">
                    <Button
                        size="sm"
                        className="w-full bg-brand-500 hover:bg-brand-600 text-white"
                        onClick={() =>
                            navigate(`/Country/${Country.id}`, {
                                state: { Country },
                            })
                        }
                    >
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CountryCard;