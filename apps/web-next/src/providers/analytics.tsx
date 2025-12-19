"use client";

import { useAuth } from "@/providers/auth";
import { useNotification } from "@/providers/notification";
import { baseUrl } from "@/utils/url";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnalyticsApi, AnalyticsDto, Configuration } from "@/lib/api";
import { useCookies } from "next-client-cookies";

interface AnalyticsContextProps {
  autoRefresh: boolean;
  setAutoRefresh: Dispatch<SetStateAction<boolean>>;
  fetchAnalytics: () => Promise<AnalyticsDto[] | undefined>;
  fetchUserAnalytics: (id: string) => Promise<AnalyticsDto[] | undefined>;
}

interface AnalyticsProvider {
  children: ReactNode;
}

const AnalyticsContext = createContext<AnalyticsContextProps | undefined>(
  undefined
);

export const AnalyticsProvider = ({ children }: AnalyticsProvider) => {
  const [autoRefresh, setAutoRefresh] = useState(false);
  const cookies = useCookies();
  const { throwError } = useNotification();
  const { user } = useAuth();

  const config = new Configuration({
    basePath: baseUrl,
    accessToken: cookies.get("secret"),
  });

  const analyticsApi = new AnalyticsApi(config);

  const fetchAnalytics = async (): Promise<AnalyticsDto[] | undefined> => {
    try {
      const { data } = await analyticsApi.analyticsControllerAnalytics();

      return data;
    } catch (err) {
      throwError(err, "Failed to fetch analytics");
    }
  };

  const fetchUserAnalytics = async (
    id: string
  ): Promise<AnalyticsDto[] | undefined> => {
    try {
      const { data } = await analyticsApi.analyticsControllerUser(id);
      return data;
    } catch (err) {
      throwError(err, "Failed to fetch user analytics");
    }
  };

  useEffect(() => {
    if (!user || !user.admin) return;
    fetchAnalytics();

    if (autoRefresh) setInterval(fetchAnalytics, 2000);
  }, [user, autoRefresh]);

  return (
    <AnalyticsContext.Provider
      value={{
        autoRefresh,
        setAutoRefresh,
        fetchUserAnalytics,
        fetchAnalytics,
      }}
    >
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
