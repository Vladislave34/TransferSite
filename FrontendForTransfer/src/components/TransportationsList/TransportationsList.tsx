import {transportationApi} from "../../services/TransportationService/TransportationService.ts";
import TransportationCard from "../../UI/TransportationCard/TransportationCard.tsx";


const TransportationsList = () => {
    const {data} = transportationApi.useFetchAllTransportationsQuery();
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-10">
            {data?.map((transportation) => (
                <TransportationCard transportation={transportation} key={transportation.id} />
            ))}
        </div>
    );
};

export default TransportationsList;