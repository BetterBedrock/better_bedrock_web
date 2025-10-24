import { BedrockText } from "~/components/bedrock/bedrock-text";

import { useHero, styles } from ".";

export const HeroRedownloadMessage = () => {
  const { cookie, download } = useHero();

  return (
    <BedrockText
      type="p"
      color="white"
      extraClassName={styles.label}
      text="Download did not start? Click here!"
      onClick={() => download(cookie.voucher)}
    />
  );
};
