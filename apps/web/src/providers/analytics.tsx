import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AnalyticsApi, AnalyticsDto, Configuration } from "~/lib/api";
import { useAuth } from "~/providers/auth";
import { useNotification } from "~/providers/notification";
import { baseUrl } from "~/utils/url";

interface AnalyticsContextProps {
  analytics: AnalyticsDto[];
  fetchAnalytics: () => Promise<void>;
  fetchUserAnalytics: () => Promise<AnalyticsDto[] | undefined>;
}

interface AnalyticsProvider {
  children: ReactNode;
}

const AnalyticsContext = createContext<AnalyticsContextProps | undefined>(undefined);

export const AnalyticsProvider = ({ children }: AnalyticsProvider) => {
  const [cookie] = useCookies(["adminSecret", "secret"]);
  const [analytics, setAnalytics] = useState<AnalyticsDto[]>([]);
  const { throwError } = useNotification();
  const { authenticated } = useAuth();

  const adminConfig = new Configuration({
    basePath: baseUrl,
    accessToken: cookie.adminSecret,
  });

  const config = new Configuration({
    basePath: baseUrl,
    accessToken: cookie.secret,
  });

  const adminAnalyticsApi = new AnalyticsApi(adminConfig);
  const analyticsApi = new AnalyticsApi(config);

  const fetchAnalytics = async () => {
    try {
      const { data } = await adminAnalyticsApi.analyticsControllerAnalytics();

      setAnalytics(data);
    } catch (err) {
      throwError(err, "Failed to fetch analytics");
    }
  };

  const fetchUserAnalytics = async (): Promise<AnalyticsDto[] | undefined> => {
    try {
      const { data } = await analyticsApi.analyticsControllerUser();
      return data;
    } catch (err) {
      throwError(err, "Failed to fetch analytics");
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    fetchAnalytics();

    setInterval(fetchAnalytics, 2000);
  }, [authenticated]);

  return (
    <AnalyticsContext.Provider value={{ analytics, fetchUserAnalytics, fetchAnalytics }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw Error("useAnalytics has to be used within AnalyticsContext");
  }

  return context;
};
