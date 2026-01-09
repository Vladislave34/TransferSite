import { useCallback, useState } from "react";

export const useTransportaionConfirmModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [transportaionId, setTransportaionId] = useState<number | null>(null);
    const [amount, setAmount] = useState("");

    const open = useCallback((id: number) => {
        setTransportaionId(id);
        setAmount("");
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        setTransportaionId(null);
    }, []);

    const onChangeAmount = useCallback((value: string) => {
        // дозволяємо тільки цифри
        if (/^\d*$/.test(value)) {
            setAmount(value);
        }
    }, []);

    return {
        isOpen,
        transportaionId,
        amount,
        open,
        close,
        onChangeAmount,
    };
};