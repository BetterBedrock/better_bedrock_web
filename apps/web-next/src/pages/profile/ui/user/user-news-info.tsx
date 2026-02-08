import { Banner } from "@/shared/ui/banner";
import { SimpleUserDto } from "@/shared/lib/openapi";
import { fetchLoggedUser } from "@/entities/auth";
import { Routes } from "@/shared/lib/utils";
import { BedrockText } from "@/shared/ui/bedrock-text";

import { Link } from "@/shared/ui/link";

interface UserNewsInfoProps {
  selectedUser?: SimpleUserDto;
}

export const UserNewsInfo = async ({
  selectedUser,
}: UserNewsInfoProps) => {
  const user = await fetchLoggedUser();
  const isOwnProfile = user?.id === selectedUser?.id;

  const hideAfterDate = new Date('2026-02-15');
  const currentDate = new Date();
  const isExpired = currentDate > hideAfterDate;

  const shouldShow = isOwnProfile && !isExpired;

  if (!shouldShow) return null;

  return (
    <Banner
      type="important"
      message={
        <BedrockText textAlign="center" color="black" text="We have added new monetization type: LOOTLABS - AD provider with better potential! For more information visit ">
          <Link link={Routes.MONETIZATION} underlined>
            this page.
          </Link>
        </BedrockText>
      }
    />
  );
};
