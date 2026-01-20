import { CreateVoucher, UpdateVoucher, VoucherApi } from "@/shared/api/openapi";
import { axiosCustomInstance, baseApiConfig } from "@/shared/api/client";

const voucherApi = new VoucherApi(
    baseApiConfig,
    undefined,
    axiosCustomInstance,
);

export const fetchAllVouchersRequest = async (secret: string) =>
    voucherApi.voucherControllerVouchers({
        headers: { Authorization: `Bearer ${secret}` },
    });

export const updateVoucherRequest = async (
    id: string,
    voucher: UpdateVoucher,
    secret: string,
) =>
    voucherApi.voucherControllerUpdate(id, voucher, {
        headers: { Authorization: `Bearer ${secret}` },
    });
export const createVoucherRequest = async (
    voucher: CreateVoucher,
    secret: string,
) =>
    voucherApi.voucherControllerCreate(voucher, {
        headers: { Authorization: `Bearer ${secret}` },
    });
