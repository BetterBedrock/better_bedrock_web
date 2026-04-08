"use client";

import { useSettings } from "@/app/providers/settings";
import { SettingsBannerPopup } from "@/pages/panel/ui/hero-dashboard/settings/banner/settings-banner-popup";
import { ModCard } from "@/shared/ui/mod-card";

export const SettingsBanner = () => {
  const { settings, updateSettings } = useSettings();

  const handleUpdate = (enabled: boolean) => {
    if (!settings) return;
    const newSettings = { ...settings, banner: enabled };
    updateSettings(newSettings);
  };

  return (
    <ModCard
      name="Banner"
      tags={["Top-screen message"]}
      imageSrc="/icons/comment2.png"
      onChange={handleUpdate}
      defaultEnabled={settings?.banner}
      popup={(close) => <SettingsBannerPopup onClose={close} />}
    />
  );
};
