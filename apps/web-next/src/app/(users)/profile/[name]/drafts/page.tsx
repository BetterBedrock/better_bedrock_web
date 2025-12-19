import { fetchLoggedUser } from "@/lib/auth/fetch-logged-user";
import { notFound } from "next/navigation";
import { loadUserProfile } from "@/lib/user/load-user-profile";

import { DraftsList } from "./drafts-list";
import { DraftsAction } from "./drafts-action";

import styles from "./drafts.module.scss";

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
      <DraftsList name={selectedUser.name} />
    </div>
  );
}
