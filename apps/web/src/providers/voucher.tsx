import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { VoucherApi, Configuration, VoucherDto, CreateVoucher, UpdateVoucher } from "~/lib/api";
import { useAuth } from "~/providers/auth";
import { useNotification } from "~/providers/notification";
import { baseUrl } from "~/utils/url";

interface VoucherContextProps {
  vouchers: VoucherDto[];
  fetchVouchers: () => Promise<void>;
  createVoucher: (voucher: CreateVoucher) => Promise<VoucherDto | undefined>;
  updateVoucher: (id: string, voucher: UpdateVoucher) => Promise<VoucherDto | undefined>;
}

interface VoucherProviderProps {
  children: ReactNode;
}

const VoucherContext = createContext<VoucherContextProps | undefined>(undefined);

export const VoucherProvider = ({ children }: VoucherProviderProps) => {
  const [vouchers, setVouchers] = useState<VoucherDto[]>([]);
  const { user } = useAuth();
  const [cookie] = useCookies(["secret"]);
  const { throwError } = useNotification();

  const config = new Configuration({
    basePath: baseUrl,
    accessToken: cookie.secret,
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
      if (vouchers.find((v) => v.code === voucher.code)) {
        throwError(null, "Voucher with this code already exists");
        return;
      }

      const { data } = await voucherApi.voucherControllerCreate(voucher);

      setVouchers((prev) => [...prev, data]);

      return data;
    } catch (err) {
      throwError(err, "Failed to create voucher");
    }
  };

  const updateVoucher = async (id: string, voucher: UpdateVoucher) => {
    try {
      if (vouchers.find((v) => v.code === voucher.code && id !== v.id)) {
        throwError(null, "Voucher with this code already exists");
        return;
      }

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

      return data;
    } catch (err) {
      throwError(err, "Failed to create voucher");
    }
  };

  useEffect(() => {
    if (user && user.admin) {
      fetchVouchers();
    }
  }, [user]);

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
