"use client";

import { PopupWrapper } from "@/_components/popup/popup-wrapper";
import { SimpleButton } from "@/_components/simple-button";
import { DetailedUserDto } from "@/_lib/api";
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
