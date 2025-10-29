import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useCheckout } from "~/providers/checkout";

interface UseActiveVoucherProps {
    checkoutId: string;
}

export const useActiveVoucher = ({ checkoutId }: UseActiveVoucherProps) => {
    const [__, setCookie] = useCookies(["voucher"]);

    const { activateVoucher } = useCheckout();

    useEffect(() => {
        activateVoucher(checkoutId).then((voucher) => {
            if (voucher === null) {
                return;
            }

            setCookie("voucher", voucher);
        });
    }, []);
}