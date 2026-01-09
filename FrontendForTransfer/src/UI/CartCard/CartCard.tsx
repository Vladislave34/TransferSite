import {type FC, memo} from "react";
import type ICartItem from "../../models/Cart/ICartItem";

interface Props {
    item: ICartItem;
}

const CartTransportationCard: FC<Props> = ({ item }) => {
    return (
        <div
            className="
        w-full rounded-2xl border bg-white transition
        border-gray-200
        dark:border-gray-700 dark:bg-gray-900
      "
        >
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Code: {item.code}
        </span>

                <span
                    className="
            rounded-full px-3 py-1 text-xs font-medium
            bg-gray-100 text-gray-700
            dark:bg-gray-800 dark:text-gray-200
          "
                >
          {item.statusName}
        </span>
            </div>

            {/* Body */}
            <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700 space-y-4">
                {/* Route */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {item.fromCityName} → {item.toCityName}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {item.fromCountryName} — {item.toCountryName}
                    </p>
                </div>

                {/* Time */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Departure</p>
                        <p className="text-gray-800 dark:text-white">
                            {item.departureTime}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500">Arrival</p>
                        <p className="text-gray-800 dark:text-white">
                            {item.arrivalTime}
                        </p>
                    </div>
                </div>

                {/* Quantity */}
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Tickets in cart:{" "}
                    <span className="font-semibold text-gray-800 dark:text-white">
            {item.quantity}
          </span>
                </p>

                {/* Pay button */}
                <button
                    className="
            w-full rounded-xl py-2 text-sm font-medium transition
            bg-indigo-600 text-white
            hover:bg-indigo-500
          "
                >
                    Оплатити
                </button>
            </div>
        </div>
    );
};

export default memo(CartTransportationCard);