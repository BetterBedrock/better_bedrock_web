import { BedrockText } from "~/components/bedrock/bedrock-text";

import { styles } from ".";
import { useCookies } from "react-cookie";
import { useDownload } from "~/providers/download";

export const HeroRedownloadMessage = () => {
  const [cookie] = useCookies(["voucher"]);
  const { download } = useDownload();

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
