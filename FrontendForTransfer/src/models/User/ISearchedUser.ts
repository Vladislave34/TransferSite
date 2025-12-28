export  interface ISearchedUser {
    id: number;
    email: string;
    fullName: string;
    image: string;
    roles: string[];

}
export interface IPagination {
    totalCount: number,
    totalPages: number,
    itemsPerPage: number,
    currentPage: number
}

export default interface ISearchedResult {
    items: ISearchedUser[];
    pagination: IPagination;
}