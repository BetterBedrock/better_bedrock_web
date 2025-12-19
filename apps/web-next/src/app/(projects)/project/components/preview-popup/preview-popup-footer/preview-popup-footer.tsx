import { BedrockText } from "@/components/bedrock-text";
import { Link } from "@/components/link";
import { Popup } from "@/components/popup";
import { Routes } from "@/utils/routes";

import styles from "./preview-popup-footer.module.scss";
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
