import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { $api } from "~/services/api-client";
import { CheckoutOffersDto } from "@better-bedrock/constants/checkout.dto";
import { VoucherDto } from "@better-bedrock/constants/voucher.dto";
import { NotificationType, useNotification } from "~/providers/notification";

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
  const { sendNotification } = useNotification();
  const [offers, setOffers] = useState<CheckoutOffersDto | undefined>(undefined);

  //TODO: Send notifications when something  does not work
  const fetchCheckoutOffers = async () => {
    const { data, error } = await $api.GET("/checkout/offers");

    if (error) {
      throw error;
    }

    setOffers(data);
  };

  const createSession = async (priceId: string) => {
    const { data, error } = await $api.POST("/checkout/create", {
      params: {
        query: {
          priceId,
        },
      },
    });

    if (error) {
      throw error;
    }

    return data;
  };

  const activateVoucher = async (checkoutId?: string, code?: string) => {
    const { data, error, response } = await $api.GET("/checkout/activate", {
      params: {
        query: {
          checkoutId,
          code,
        },
      },
    });
    if (error) {
      let title = "";
      let label = "";
      let type = "" as NotificationType;
      switch (response.status) {
        case 400:
          title = "Missing Code";
          label = "You need to provide either checkoutId or voucher code";
          type = "error";
          break;
        case 404:
          title = "Voucher not found";
          label = "Given voucher code does not exist";
          type = "error";
          break;
        case 502:
          title = "Activation was unsuccessful";
          label = "There was an error on our side and activiation did not succeed";
          type = "error";
          break;
        default:
          title = "Error While Activating";
          label = "Please report this issue to us on our discord";
          type = "error";
          break;
      }

      sendNotification({
        title,
        label,
        type,
      });
      throw Error(error);
    }

    return {
      ...data,
      createdAt: new Date(data!.createdAt),
      expiresAt: new Date(data!.expiresAt),
    } as VoucherDto;
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
