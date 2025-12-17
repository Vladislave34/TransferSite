import { cityApi } from "../../services/CityService/CityService";
import API_ENV from "../../env";

import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
} from "../../admin/components/ui/table";



const AdminCityList = () => {
    const { data } = cityApi.useFetchAllCitiesQuery();

    return (
        <div className="w-full p-6">
            <div className="overflow-hidden rounded-2xl bg-[#0f172a] border border-white/10">
                <Table className="text-sm text-gray-300">
                    {/* HEADER */}
                    <TableHeader className="bg-[#111827]">
                        <TableRow>
                            <TableCell isHeader className="px-6 py-4 text-left">
                                City
                            </TableCell>
                            <TableCell isHeader className="px-6 py-4 text-left">
                                Slug
                            </TableCell>
                            <TableCell isHeader className="px-6 py-4 text-left">
                                Country
                            </TableCell>
                            <TableCell isHeader className="px-6 py-4 text-left">
                                Image
                            </TableCell>
                            <TableCell isHeader className="px-6 py-4 text-right">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    {/* BODY */}
                    <TableBody>
                        {data?.map((city) => (
                            <TableRow
                                key={city.id}
                                className="border-t border-white/5 hover:bg-white/5 transition"
                            >
                                {/* NAME */}
                                <TableCell className="px-6 py-4 font-medium text-white">
                                    {city.name}
                                </TableCell>

                                {/* SLUG */}
                                <TableCell className="px-6 py-4 text-gray-400">
                                    {city.slug}
                                </TableCell>

                                {/* COUNTRY */}
                                <TableCell className="px-6 py-4">
                                    {city.country}
                                </TableCell>

                                {/* IMAGE */}
                                <TableCell className="px-6 py-4">
                                    {city.image ? (
                                        <img
                                            src={`${API_ENV.API_BASE_URL}/images/${city.image}`}
                                            alt={city.name}
                                            className="w-14 h-9 rounded-md object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-500 text-xs">No image</span>
                                    )}
                                </TableCell>

                                {/* ACTIONS */}
                                <TableCell className="px-6 py-4">
                                    <div
                                        className="flex justify-end gap-4"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {/*<DeleteCityButton id={city.id} />*/}
                                        {/*<EditCityButton id={city.id} city={city} />*/}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminCityList;