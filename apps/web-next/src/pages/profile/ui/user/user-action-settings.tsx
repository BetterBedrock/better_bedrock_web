"use client";

import { PopupWrapper } from "@/shared/ui/popup";
import { SimpleButton } from "@/shared/ui/simple-button";
import { DetailedUserDto } from "@/shared/lib/openapi";
import SettingsGlyph from "@/public/images/settings_glyph.png";
import { UserSettingsForm } from "./user-settings-form";

import styles from "./user.module.scss";
import Image from "next/image";

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
      <Image
        height={24}
        width={24}
        unoptimized
        alt="Settings Glyph"
        src={SettingsGlyph.src}
        className={styles.settings}
      />
    </SimpleButton>
  </PopupWrapper>
);
