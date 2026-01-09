export default interface ITransportation {
    id: number;
    code: string;
    fromCityName: string;
    fromCountryName: string;
    toCityName: string;
    toCountryName: string;
    departureTime: string; // "06.01.2026 14:49"
    arrivalTime: string;   // "06.01.2026 14:49"
    seatsTotal: number;
    seatsAvailable: number;
    statusName: string;
}