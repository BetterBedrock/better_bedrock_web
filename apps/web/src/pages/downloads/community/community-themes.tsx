import {
  ThemesHeading,
  ThemesActions,
  ThemesList,
} from "./themes";

import { styles } from ".";

export const CommunityThemes = () => (
  <div className={styles.themes}>
    <ThemesHeading />
    <ThemesActions />
    <ThemesList />
  </div>
);
