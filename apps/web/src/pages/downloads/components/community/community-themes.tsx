import {
  ThemesActions,
  ThemesList,
} from "./themes";

import { styles } from ".";

export const CommunityThemes = () => (
  <div className={styles.themes}>
    <ThemesActions />
    <ThemesList />
  </div>
);
