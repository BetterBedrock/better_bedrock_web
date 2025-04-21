import { HeroDescription, HeroActions, HeroTitle } from "./header";
import { styles } from ".";

export const HeroHeader = () => (
  <div className={styles.header}>
    <HeroTitle />
    <HeroDescription />
    <HeroActions />
  </div>
);

{
  /* <div style={{ display: "flex", marginTop: "2rem", border: "var(--minecraftdepth) solid rgb(30, 30, 30)" }}>
          <video src={exampleVideo} loop autoPlay muted style={{ width: "100%" }} />
        </div> */
}
