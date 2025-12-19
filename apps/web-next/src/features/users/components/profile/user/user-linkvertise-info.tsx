import { Banner } from "@/components/banner";
import { SimpleUserDto } from "@/lib/api";
import { fetchLoggedUser } from "@/lib/auth/fetch-logged-user";

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
    <Banner
      type="info"
      message="You're one step away from unlocking 100% ad revenue! Complete your Linkvertise setup in settings now and start earning big."
    />
  );
};
