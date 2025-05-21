import LogoLines from "~/assets/images/lines.png";
import { styles } from ".";
import clsx from "clsx";
import { BedrockText } from "~/components/bedrock/bedrock-text";

export const HeroTitle = () => (
  <div className={styles.heading}>
    <img className={styles.logo} alt="Logo Line Left" src={LogoLines} />
    <BedrockText
      type="h1"
      text="Better Bedrock"
      color="white"
      font="MinecraftTen"
      textAlign="center"
      extraClassName={styles.title}
    />
    <img className={clsx(styles.logo, styles.reversed)} alt="Logo Line Right" src={LogoLines} />
  </div>
);
