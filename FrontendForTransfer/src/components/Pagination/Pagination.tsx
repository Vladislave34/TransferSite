import PaginationItem from "../../UI/PaginationItem/PaginationItem.tsx";


const Pagination = ({pages}: {pages : number[]}) => {
    return (
        <div
        className="max-w-full overflow-x-auto flex flex-row justify-around"
        >
            {pages.map((page) => (
                <PaginationItem num={page} />
            ))}
        </div>
    );
};

export default Pagination;