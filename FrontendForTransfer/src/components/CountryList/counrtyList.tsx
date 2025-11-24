import {countryApi} from "../../services/CountryService/CountryService.ts";
import {useEffect} from "react";
import CountryCard from "../../UI/CountryCard/countryCard.tsx";


const CounrtyList = () => {
    const { data,} = countryApi.useFetchAllCountriesQuery();
    useEffect(() => {console.log(data)}, [data]);
    return (
        <div className='h-full w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 items-stretch '>
            {data?.map((country, index) => (
                <CountryCard Country={country} key={index} />
            ))}
        </div>
    );
};

export default CounrtyList;