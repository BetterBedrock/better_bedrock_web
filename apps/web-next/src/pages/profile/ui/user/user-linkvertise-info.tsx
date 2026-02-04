import { Banner } from "@/shared/ui/banner";
import { SimpleUserDto } from "@/shared/lib/openapi";
import { fetchLoggedUser } from "@/entities/auth";
import { Routes } from "@/shared/lib/utils";
import { BedrockText } from "@/shared/ui/bedrock-text";

import styles from "./user.module.scss";
import { Link } from "@/shared/ui/link";

interface UserLinkvertiseInfoProps {
  selectedUser?: SimpleUserDto;
}

export const UserLinkvertiseInfo = async ({
  selectedUser,
}: UserLinkvertiseInfoProps) => {
  const user = await fetchLoggedUser();
  const shouldShow = user?.id === (selectedUser?.id && !selectedUser?.linkvertiseId) || (selectedUser?.id && !selectedUser?.lootlabsLinkId);

  if (!shouldShow) return null;

  return (
    <div className={styles.AdBanner}>
      <Banner
        type="info"
        message={
          <BedrockText textAlign="center" color="white">
            Almost there! Unlock 100% of your ad revenue now. Finish your AD
            provider setup in profile settings and start earning from your
            downloads!{" "}
            <Link link={Routes.MONETIZATION} className={styles.link}>
              Check this tutorial page to learn how!
            </Link>
          </BedrockText>
        }
      />
    </div>
  );
};
