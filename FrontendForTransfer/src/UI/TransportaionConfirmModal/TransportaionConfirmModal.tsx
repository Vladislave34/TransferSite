import type { FC } from "react";

interface Props {
    isOpen: boolean;
    amount: string;
    onChangeAmount: (value: string) => void;
    onConfirm: () => void;
    onClose: () => void;
}

const TransportationConfirmModal: FC<Props> = ({
                                         isOpen,
                                         amount,
                                         onChangeAmount,
                                         onConfirm,
                                         onClose,
                                     }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 dark:bg-gray-900">
                <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                    Бронювання
                </h2>

                <input
                    value={amount}
                    onChange={(e) => onChangeAmount(e.target.value)}
                    placeholder="Введіть кількість"
                    className="
                        w-full rounded-xl border px-4 py-2
                        border-gray-300 dark:border-gray-700
                        bg-white dark:bg-gray-800
                        text-gray-800 dark:text-white
                        focus:outline-none focus:ring-2 focus:ring-indigo-500
                      "
                />

                <button
                    onClick={onConfirm}
                    className="
            mt-6 w-full rounded-xl py-2 font-medium
            bg-indigo-600 text-white hover:bg-indigo-500
          "
                >
                    Підтвердити
                </button>
            </div>
        </div>
    );
};

export default TransportationConfirmModal;