import { createContext, ReactNode, useContext } from "react";
import { useCookies } from "react-cookie";
import { VoucherApi, Configuration, VoucherDto, CreateVoucher, UpdateVoucher } from "~/lib/api";
import { useNotification } from "~/providers/notification";
import { baseUrl } from "~/utils/url";

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
  const [cookie] = useCookies(["secret"]);
  const { throwError } = useNotification();

  const config = new Configuration({
    basePath: baseUrl,
    accessToken: cookie.secret,
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
