import { CheckoutApi } from "@/_lib/api";
import { baseApiConfig } from "@/_lib/client";

const checkoutApi = new CheckoutApi(baseApiConfig);

export const activateVoucherRequest = async (checkoutId?: string, code?: string) => checkoutApi.checkoutControllerActivate(
    checkoutId,
    code
);

export const fetchCheckoutOffersRequest = async () => checkoutApi.checkoutControllerOffers();
export const createSessionRequest = async (priceId: string) => checkoutApi.checkoutControllerCreate(priceId);