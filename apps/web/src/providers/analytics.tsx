import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AnalyticsApi, AnalyticsDto, Configuration } from "~/lib/api";
import { useAuth } from "~/providers/auth";
import { useNotification } from "~/providers/notification";
import { baseUrl } from "~/utils/url";

interface AnalyticsContextProps {
  analytics: AnalyticsDto[];
  fetchAnalytics: () => Promise<void>;
}

interface AnalyticsProvider {
  children: ReactNode;
}

const AnalyticsContext = createContext<AnalyticsContextProps | undefined>(undefined);

export const AnalyticsProvider = ({ children }: AnalyticsProvider) => {
  const [cookie] = useCookies(["adminSecret"]);
  const [analytics, setAnalytics] = useState<AnalyticsDto[]>([]);
  const { throwError } = useNotification();
  const { authenticated } = useAuth();

  const config = new Configuration({
    basePath: baseUrl,
    accessToken: cookie.adminSecret,
  });

  const analyticsApi = new AnalyticsApi(config);

  const fetchAnalytics = async () => {
    try {
      const { data } = await analyticsApi.analyticsControllerAnalytics();

      console.log({ analyticsData: data });
      setAnalytics(data);
    } catch (err) {
      throwError(err, "Failed to fetch analytics");
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    fetchAnalytics();
  }, [authenticated]);

  return (
    <AnalyticsContext.Provider value={{ analytics, fetchAnalytics }}>
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
