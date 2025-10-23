import clsx from "clsx";
import { ProjectMode } from "~/pages/project/project";
import { AuthorDetailsAvatar, AuthorDetailsSkipButton, styles } from ".";

interface AuthorDetails {
  mode: ProjectMode;
}

export const AuthorDetails = ({ mode }: AuthorDetails) => (
  <div className={clsx(styles.editor)}>
    <AuthorDetailsAvatar />
    {mode === "view" && <AuthorDetailsSkipButton />}
  </div>
);
