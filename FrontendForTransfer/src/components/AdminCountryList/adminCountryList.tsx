
import { countryApi } from "../../services/CountryService/CountryService";



import API_ENV from "../../env";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
} from "../../admin/components/ui/table";
import DeleteCountryButton from "../../UI/DeleteCountryButton/DeleteCountryButton.tsx";
import EditCountryButton from "../../UI/EditCountryButton/EditCountryButton.tsx";


const AdminCountryList = () => {
    const { data } = countryApi.useFetchAllCountriesQuery();


    return (
        <div className="w-full p-6">
            <div className="overflow-hidden rounded-2xl bg-[#0f172a] border border-white/10">
                <Table className="text-sm text-gray-300">
                    {/* HEADER */}
                    <TableHeader className="bg-[#111827]">
                        <TableRow>
                            <TableCell isHeader className="px-6 py-4 text-left">
                                Country
                            </TableCell>
                            <TableCell isHeader className="px-6 py-4 text-left">
                                Code
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
                        {data?.map((country) => (
                            <TableRow
                                key={country.id}
                                className="border-t border-white/5 hover:bg-white/5 transition cursor-pointer"

                            >
                                {/* NAME */}
                                <TableCell className="px-6 py-4">
                                    <p className="font-medium text-white">
                                        {country.name}
                                    </p>
                                </TableCell>

                                {/* CODE */}
                                <TableCell className="px-6 py-4 uppercase text-sm">
                                    {country.code}
                                </TableCell>

                                {/* IMAGE */}
                                <TableCell className="px-6 py-4">
                                    <img
                                        src={`${API_ENV.API_BASE_URL}/images/${country.image}`}
                                        alt={country.name}
                                        className="w-14 h-9 rounded-md object-cover"
                                    />
                                </TableCell>

                                {/* ACTIONS */}
                                <TableCell className="px-6 py-4">
                                    {country.id !== undefined && (
                                        <div
                                            className="flex justify-end gap-4"
                                            onClick={(e) => e.stopPropagation()} // ⛔ не переходимо по кліку
                                        >
                                            <DeleteCountryButton id={country.id} />
                                            <EditCountryButton
                                                id={country.id}
                                                country={country}
                                            />
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminCountryList;