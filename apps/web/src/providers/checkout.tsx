import { createContext, ReactNode, useContext } from "react";
import { $api } from "~/services/api-client";

interface CheckoutContextProps {
  createSession: () => Promise<Record<string, never> | undefined>;
}

interface CheckoutProviderProps {
  children: ReactNode;
}

const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);

export const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const createSession = async () => {
    const { data, error } = await $api.POST("/checkout/create", {});

    if (error) {
      throw error;
    }

    return data;
  };

  return <CheckoutContext.Provider value={{ createSession }}>{children}</CheckoutContext.Provider>;
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw Error("useCheckout has to be used within CheckoutContext");
  }

  return context;
};
