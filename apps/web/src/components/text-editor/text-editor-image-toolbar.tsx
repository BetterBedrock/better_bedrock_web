
import { styles } from ".";

import { DeleteButton } from "~/components/text-editor/ui/delete/delete-button";

export const TextEditorImageToolbar = () => (
  <div className={styles.toolbar}>
    <DeleteButton />
  </div>
);
