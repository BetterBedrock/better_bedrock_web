import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import Steve from "~/assets/images/avatars/Steve.png";
// import { Label } from "~/components/bedrock/label";
import { Card } from "~/components/bedrock/card";
import { Outlet } from "react-router-dom";
import { Rating } from "~/components/rating";
import { Tabs } from "~/pages/profile/components/user/tabs";

export const User = () => (
  <div className={styles.wrapper}>
    <Card>
      <div className={styles.profile}>
        <img src={Steve} className={styles.image} />
        <div className={styles.profileInfo}>
          <BedrockText type="h1" text="iDarkQ" color="white" textAlign="left" font="Minecraft" />
          <BedrockText type="p" text="Lorem ipsum dolor sit amet" color="white" textAlign="left" />
          <Rating rating={2.56} />
        </div>
      </div>
    </Card>

    <Tabs />

    <Outlet />
  </div>
);
