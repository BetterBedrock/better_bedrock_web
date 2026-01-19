import { CheckoutApi } from "@/shared/lib/openapi";
import { axiosCustomInstance, baseApiConfig } from "@/shared/lib/utils";

const checkoutApi = new CheckoutApi(
    baseApiConfig,
    undefined,
    axiosCustomInstance,
);

export const activateVoucherRequest = async (
    checkoutId?: string,
    code?: string,
) => checkoutApi.checkoutControllerActivate(checkoutId, code);

export const fetchCheckoutOffersRequest = async () =>
    checkoutApi.checkoutControllerOffers();
export const createSessionRequest = async (priceId: string) =>
    checkoutApi.checkoutControllerCreate(priceId);
