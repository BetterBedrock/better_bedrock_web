import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNotification } from "~/providers/notification";
import { VoucherDto, CheckoutOffersDto, CheckoutApi, Configuration } from "~/lib/api";
import { baseUrl } from "~/utils/url";

interface CheckoutContextProps {
  createSession: (priceId: string) => Promise<{ checkoutId: string } | undefined>;
  activateVoucher: (checkoutId?: string, code?: string) => Promise<VoucherDto | undefined>;
  fetchCheckoutOffers: () => void;
  offers: CheckoutOffersDto | undefined;
}

interface CheckoutProviderProps {
  children: ReactNode;
}

const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);

export const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const [offers, setOffers] = useState<CheckoutOffersDto | undefined>(undefined);
  const { throwError } = useNotification();

  const config = new Configuration({
    basePath: baseUrl,
  });

  const checkoutApi = new CheckoutApi(config);

  const fetchCheckoutOffers = async () => {
    try {
      const { data } = await checkoutApi.checkoutControllerOffers();

      setOffers(data);
    } catch (err) {
      throwError(err, "Failed to fetch offers");
    }
  };

  const createSession = async (priceId: string) => {
    try {
      const { data } = await checkoutApi.checkoutControllerCreate(priceId);
      return data;
    } catch (err) {
      throwError(err, "Failed to create checkout session");
    }
  };

  const activateVoucher = async (checkoutId?: string, code?: string) => {
    try {
      const { data } = await checkoutApi.checkoutControllerActivate(checkoutId, code);
      
      return data;
    } catch (err) {
      throwError(err, "Failed to activate voucher");
    }
  };

  useEffect(() => {
    fetchCheckoutOffers();
  }, []);

  return (
    <CheckoutContext.Provider
      value={{ createSession, activateVoucher, fetchCheckoutOffers, offers }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw Error("useCheckout has to be used within CheckoutContext");
  }

  return context;
};
