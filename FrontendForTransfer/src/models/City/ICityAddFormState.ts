export default interface ICityAddFormState {
    name: string;
    slug: string;
    description?: string;
    countryId: number | string;
    image?: File | null;
}