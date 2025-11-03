import { fetchLoggedUser } from "@/_lib/auth/fetch-logged-user";
import { styles, DraftsList, DraftsAction } from ".";
import { notFound } from "next/navigation";
import { loadUserProfile } from "@/_lib/user/load-user-profile";

interface DraftsProps {
  params?: Promise<{ name: string }>;
}

export default async function Drafts({ params }: DraftsProps) {
  const loadedParams = await params;

  if (!loadedParams) notFound();

  const user = await fetchLoggedUser();
  const selectedUser = await loadUserProfile(loadedParams.name);

  const isOwner = selectedUser?.id === user?.id;

  return (
    <div className={styles.list}>
      {isOwner && <DraftsAction />}
      <DraftsList name={loadedParams.name} />
    </div>
  );
}
