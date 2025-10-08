import { styles } from ".";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { HeaderStripes } from "~/pages/home/components/hero/header/header-stripes";

export const HeroTitle = () => (
  <span className={styles.heading}>
    {/* <img className={styles.logo} alt="Logo Line Left" src={LogoLines} /> */}
    <HeaderStripes side="right" />
    <BedrockText
      type="h1"
      text="Better Bedrock"
      color="white"
      font="Minecraft"
      textAlign="center"
      extraClassName={styles.title}
      shadow
    />
    <HeaderStripes side="left" />
  </span>
);
