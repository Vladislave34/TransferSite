import type { FC } from "react";
import type ITransportation from "../../models/Transportation/ITransportation";
import {useTransportaionConfirmModal} from "../../hooks/useCartConfirmModal.ts";
import {cartApi} from "../../services/CartService/CartService.ts";
import TransportationConfirmModal from "../TransportaionConfirmModal/TransportaionConfirmModal.tsx";

interface Props {
    transportation: ITransportation;
}

const TransportationCard: FC<Props> = ({ transportation }) => {
    const modal = useTransportaionConfirmModal();
    const [bookNow] = cartApi.useAddUpdateCartMutation();
    const noSeats = transportation.seatsAvailable === 0;

    return (
        <div
            className="
                w-full rounded-2xl border transition
                border-gray-200 bg-white
                dark:border-gray-700 dark:bg-gray-900

            "
        >
            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Code: {transportation.code}
                </span>

                <span
                    className="
                        rounded-full px-3 py-1 text-xs font-medium
                        bg-gray-100 text-gray-700
                        dark:bg-gray-800 dark:text-gray-200
                    "
                >
                    {transportation.statusName}
                </span>
            </div>

            {/* Body */}
            <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700 space-y-4">
                {/* Route */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {transportation.fromCityName} → {transportation.toCityName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {transportation.fromCountryName} — {transportation.toCountryName}
                    </p>
                </div>

                {/* Time */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Departure</p>
                        <p className="text-gray-800 dark:text-white">
                            {transportation.departureTime}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Arrival</p>
                        <p className="text-gray-800 dark:text-white">
                            {transportation.arrivalTime}
                        </p>
                    </div>
                </div>

                {/* Seats */}
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Seats:{" "}
                    <span
                        className={`font-semibold ${
                            noSeats
                                ? "text-red-600 dark:text-red-400"
                                : "text-gray-800 dark:text-white"
                        }`}
                    >
                        {transportation.seatsAvailable}/{transportation.seatsTotal}
                    </span>
                </p>

                {/* Button */}
                <button
                    disabled={noSeats}
                    onClick={()=> modal.open(transportation.id)}
                    className={`
                        w-full rounded-xl py-2 text-sm font-medium transition
                        ${
                        noSeats
                            ? `
                                    bg-gray-300 text-gray-500
                                    dark:bg-gray-700 dark:text-gray-400
                                    cursor-not-allowed
                                `
                            : `
                                    bg-gray-800 text-white
                                    hover:bg-gray-700
                                    dark:bg-indigo-600 dark:hover:bg-indigo-500
                                `
                    }
                    `}
                >
                    {noSeats ? "No seats available" : "Book now"}
                </button>
                <TransportationConfirmModal
                    isOpen={modal.isOpen}
                    amount={modal.amount}
                    onChangeAmount={modal.onChangeAmount}
                    onClose={modal.close}
                    onConfirm={async () => {
                        const quantity = Number(modal.amount);
                        if (!modal.transportaionId || quantity <= 0) return;

                        try {
                            await bookNow({
                                transportationId: modal.transportaionId,
                                quantity: quantity,
                            }).unwrap();

                            alert("Success");
                        } catch (err) {
                            console.error(err);
                        } finally {
                            modal.close();
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default TransportationCard;