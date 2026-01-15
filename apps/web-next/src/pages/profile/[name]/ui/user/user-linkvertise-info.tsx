import { Banner } from "@/shared/ui/banner";
import { SimpleUserDto } from "@/shared/api/openapi";
import { fetchLoggedUser } from "@/shared/api/fetch-logged-user";
import Link from "next/link";
import styles from "./user.module.scss";

interface UserLinkvertiseInfoProps {
  selectedUser?: SimpleUserDto;
}

export const UserLinkvertiseInfo = async ({
  selectedUser,
}: UserLinkvertiseInfoProps) => {
  const user = await fetchLoggedUser();
  const shouldShow =
    user?.id === selectedUser?.id && !selectedUser?.linkvertiseId;

  if (!shouldShow) return null;

  return (
    <div className={styles.AdBanner}>
      <Banner
        type="info"
        message={
          <p style={{ textAlign: "center" }}>
            Almost there! Unlock 100% of your ad revenue now. Finish your AD
            provider setup in profile settings and start earning from your
            downloads!{" "}
            <Link
              href="/linkvertise"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              Check this tutorial page to learn how!
            </Link>
          </p>
        }
      />
    </div>
  );
};
