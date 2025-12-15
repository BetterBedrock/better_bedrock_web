import { BedrockText } from "@/_components/bedrock-text";
import { Link } from "@/_components/link";
import { Popup } from "@/_components/popup";
import { Routes } from "@/utils/routes";

import { styles } from ".";
import { Fragment } from "react/jsx-runtime";

const links = {
  "Privacy Policy": Routes.PRIVACY_POLICY,
  Terms: Routes.TERMS,
};

export const PreviewPopupFooter = () => (
  <Popup.Part>
    <div className={styles.links}>
      {Object.keys(links).map((key, index, arr) => (
        <Fragment key={index}>
          <Link link={links[key as keyof typeof links]}>
            <BedrockText text={key} type="p" />
          </Link>
          {index < arr.length - 1 && (
            <BedrockText color="white" text="|" type="p" />
          )}
        </Fragment>
      ))}
    </div>
  </Popup.Part>
);
