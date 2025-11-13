import { VoucherDto, CreateVoucher, UpdateVoucher, Configuration, VoucherApi } from "@/_lib/api";
import { useNotification } from "@/_providers/notification";
import { useFetchSecret } from "@/hooks/use-fetch-secret";
import { baseUrl } from "@/utils/url";
import { useCookies } from "next-client-cookies";
import { createContext, ReactNode, useContext } from "react";

interface VoucherContextProps {
  fetchVouchers: () => Promise<VoucherDto[] | undefined>;
  createVoucher: (voucher: CreateVoucher) => Promise<VoucherDto | undefined>;
  updateVoucher: (id: string, voucher: UpdateVoucher) => Promise<VoucherDto | undefined>;
}

interface VoucherProviderProps {
  children: ReactNode;
}

const VoucherContext = createContext<VoucherContextProps | undefined>(undefined);

export const VoucherProvider = ({ children }: VoucherProviderProps) => {
  const secret = useFetchSecret();
  const { throwError } = useNotification();

  const config = new Configuration({
    basePath: baseUrl,
    accessToken: secret,
  });

  const voucherApi = new VoucherApi(config);

  const fetchVouchers = async (): Promise<VoucherDto[] | undefined> => {
    try {
      const { data } = await voucherApi.voucherControllerVouchers();

      return data;
    } catch (err) {
      throwError(err, "Failed to fetch vouchers");
    }
  };

  const createVoucher = async (voucher: CreateVoucher) => {
    try {
      const { data } = await voucherApi.voucherControllerCreate(voucher);
      return data;
    } catch (err) {
      throwError(err, "Failed to create voucher");
    }
  };

  const updateVoucher = async (id: string, voucher: UpdateVoucher) => {
    try {
      const { data } = await voucherApi.voucherControllerUpdate(id, voucher);
      return data;
    } catch (err) {
      throwError(err, "Failed to create voucher");
    }
  };

  return (
    <VoucherContext.Provider value={{ updateVoucher, fetchVouchers, createVoucher }}>
      {children}
    </VoucherContext.Provider>
  );
};

export const useVoucher = () => {
  const context = useContext(VoucherContext);

  if (!context) {
    throw Error("useVoucher has to be used within VoucherContext");
  }

  return context;
};
