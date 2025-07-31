import { HeroAction, Gameplay, styles, HeroTitle, HeroDescription } from ".";
import { Config } from "../config/config";
import { CustomUis } from "../custom-uis/custom-uis";
import { Extensions } from "../extensions/extensions";
import { MenuEdiotr } from "../menu-editor/menu-editor";
import { MenuInfo } from "../menu-info/menu-info";
import { MenuMods } from "../menu-mods/menu-mods";
import { MenuSettings } from "../menu-settings/menu-settings";
import { MenuToggles } from "../menu-toggles/menu-toggles";
import { PlatformSupport } from "../platform-support/platform-support";

export const Hero = () => (
  <div className={styles.wrapper}>
    <HeroTitle />
    <HeroDescription />
    <HeroAction />

    <div className={styles.content}>
      <Gameplay />
      <MenuMods />
      <MenuEdiotr />
      <MenuSettings />
      <MenuInfo />
      <MenuToggles />
      <CustomUis />
      <Extensions />
      <Config />
      <PlatformSupport />
    </div>
  </div>
);
