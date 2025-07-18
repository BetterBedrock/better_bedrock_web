import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { VoucherApi, Configuration, VoucherDto, CreateVoucher, UpdateVoucher } from "~/lib/api";
import { useAuth } from "~/providers/auth";
import { useNotification } from "~/providers/notification";

interface VoucherContextProps {
  vouchers: VoucherDto[];
  fetchVouchers: () => Promise<void>;
  createVoucher: (voucher: CreateVoucher) => Promise<void>;
  updateVoucher: (id: string, voucher: UpdateVoucher) => Promise<void>;
}

interface VoucherProviderProps {
  children: ReactNode;
}

const VoucherContext = createContext<VoucherContextProps | undefined>(undefined);

export const VoucherProvider = ({ children }: VoucherProviderProps) => {
  const [vouchers, setVouchers] = useState<VoucherDto[]>([]);
  const { authenticated } = useAuth();
  const [cookie] = useCookies(["adminSecret"]);
  const { throwError } = useNotification();

  const config = new Configuration({
    basePath: import.meta.env.VITE_LOCAL_BACKEND_URL,
    accessToken: cookie.adminSecret,
  });

  const voucherApi = new VoucherApi(config);

  const fetchVouchers = async () => {
    try {
      const { data } = await voucherApi.voucherControllerVouchers();

      setVouchers(data);
    } catch (err) {
      throwError(err, "Failed to fetch vouchers");
    }
  };

  const createVoucher = async (voucher: CreateVoucher) => {
    try {
      const { data } = await voucherApi.voucherControllerCreate(voucher);

      setVouchers((prev) => [...prev, data]);
    } catch (err) {
      throwError(err, "Failed to create voucher");
    }
  };

  const updateVoucher = async (id: string, voucher: UpdateVoucher) => {
    try {
      const { data } = await voucherApi.voucherControllerUpdate(id, voucher);

      setVouchers((prev) =>
        prev.map((v) =>
          v.id === data.id
            ? {
                ...v,
                ...data,
              }
            : v,
        ),
      );
    } catch (err) {
      throwError(err, "Failed to create voucher");
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchVouchers();
    }
  }, [authenticated]);

  return (
    <VoucherContext.Provider value={{ updateVoucher, fetchVouchers, createVoucher, vouchers }}>
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
