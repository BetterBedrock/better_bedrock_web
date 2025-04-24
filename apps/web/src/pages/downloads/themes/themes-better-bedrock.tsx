import {
  BetterBedrockHeading,
  BetterBedrockActions,
  BetterBedrockThemesList,
} from "./better-bedrock";

import { styles } from ".";

export const ThemesBetterBedrock = () => (
  <div className={styles.themes}>
    <BetterBedrockHeading />
    <BetterBedrockActions />
    <BetterBedrockThemesList />
  </div>
);
