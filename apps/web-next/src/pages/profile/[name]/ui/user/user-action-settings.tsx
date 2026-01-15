"use client";

import { PopupWrapper } from "@/shared/ui/popup/popup-wrapper";
import { SimpleButton } from "@/shared/ui/simple-button";
import { DetailedUserDto } from "@/shared/api/openapi";
import SettingsGlyph from "@/public/images/settings_glyph.png";
import { UserSettingsForm } from "./user-settings-form";

import styles from "./user.module.scss";

interface UserActionSettingsProps {
  detailedSelectedUser: DetailedUserDto;
  ownsProfile: boolean;
  admin: boolean;
}

export const UserActionSettings = ({
  detailedSelectedUser,
  ownsProfile,
  admin,
}: UserActionSettingsProps) => (
  <PopupWrapper
    popup={(close) => (
      <UserSettingsForm
        user={detailedSelectedUser}
        onClose={close}
        admin={!ownsProfile && admin}
        ownsProfile={ownsProfile}
      />
    )}
  >
    <SimpleButton transparent>
      <img src={SettingsGlyph.src} className={styles.settings} />
    </SimpleButton>
  </PopupWrapper>
);
