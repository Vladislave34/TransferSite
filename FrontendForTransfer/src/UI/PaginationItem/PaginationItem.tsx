import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import { setFormParams} from "../../store/reducers/paginationSlice.ts";


const PaginationItem = ({num} :{num:number}) => {
    const formParams = useAppSelector(state=>state.paginationReducer.formParams);
    const dispatch = useAppDispatch();
    return (
        <div
            className={` ${num === formParams?.page ? "" +
                "border-gray-300" +
                "            bg-gray-200 p-6 " +
                "dark:border-white/[0.09]" +
                " dark:bg-white/[0.06]" : ""}
            text-base cursor-pointer rounded-xl h-10 w-10 flex
            justify-center items-center border-gray-200
            bg-gray-100 p-6 dark:border-white/[0.05] dark:bg-white/[0.03]
             text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-white/[0.05]`}
            onClick={() => {
                dispatch(setFormParams({
                    ...formParams!,
                    page: num,
                }));
            }}
        >
            {num}
        </div>
    );
};

export default PaginationItem;