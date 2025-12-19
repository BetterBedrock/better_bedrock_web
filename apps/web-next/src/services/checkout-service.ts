import { CheckoutApi } from "@/lib/api";
import { axiosCustomInstance, baseApiConfig } from "@/lib/client";

const checkoutApi = new CheckoutApi(baseApiConfig, undefined, axiosCustomInstance);

export const activateVoucherRequest = async (checkoutId?: string, code?: string) => checkoutApi.checkoutControllerActivate(
    checkoutId,
    code
);

export const fetchCheckoutOffersRequest = async () => checkoutApi.checkoutControllerOffers();
export const createSessionRequest = async (priceId: string) => checkoutApi.checkoutControllerCreate(priceId);