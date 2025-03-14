import { ChangelogTrailer } from "./changelog-trailer";
import { DynamicPageItem } from "components/bedrock/page-container/dynamic-page-item";

import homeStyles from "pages/home/home.module.css";

export const Changelog = () => (
  <DynamicPageItem backgroundUrl={require("../../../assets/images/crosshair_backgrounds/3.png")}>
    <div className={homeStyles.page_content_wrapper} style={{ width: "100%" }}>
      <ChangelogTrailer />
    </div>
  </DynamicPageItem>
);
