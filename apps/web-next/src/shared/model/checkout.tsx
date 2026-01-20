"use client";

import { CheckoutOffersDto } from "@/shared/api/openapi";
import { fetchCheckoutOffers } from "@/lib/checkout";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CheckoutContextProps {
  fetchCheckoutOffers: () => void;
  offers: CheckoutOffersDto | undefined;
}

interface CheckoutProviderProps {
  children: ReactNode;
}

const CheckoutContext = createContext<CheckoutContextProps | undefined>(
  undefined,
);

export const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const [offers, setOffers] = useState<CheckoutOffersDto | undefined>(
    undefined,
  );
  const fetchOffers = async () => {
    setOffers(await fetchCheckoutOffers());
  };

  useEffect(() => {
    // Leave this as the only case where we pre-fetch something from the server on web load
    // It is left like this to make sure visitors count updates
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOffers();
  }, []);

  return (
    <CheckoutContext.Provider value={{ fetchCheckoutOffers, offers }}>
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
