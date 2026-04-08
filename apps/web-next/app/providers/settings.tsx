"use client";

import { useNotification } from "@/app/providers/notification";
import { updateSettings as updateServerSettings } from "@/shared/api/setting";
import { SettingsDto } from "@/shared/lib/openapi";
import { createContext, ReactNode, useContext, useState } from "react";

interface SettingsContextProps {
  settings: SettingsDto | undefined;
  updateSettings: (newSettings: SettingsDto) => Promise<void>;
}

interface SettingsProviderProps {
  defaultSettings: SettingsDto | undefined;
  children: ReactNode;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined,
);

export const SettingsProvider = ({
  children,
  defaultSettings,
}: SettingsProviderProps) => {
  const { throwError } = useNotification();
  const [settings, setSettings] = useState<SettingsDto | undefined>(
    defaultSettings,
  );

  const updateSettings = async (newSettings: SettingsDto) => {
    const { error } = await updateServerSettings(newSettings);

    if (error) {
      throwError(null, error);
      return;
    }

    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw Error("useSettings has to be used within SettingsContext");
  }

  return context;
};
