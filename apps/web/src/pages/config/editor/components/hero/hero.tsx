import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Label } from "~/components/bedrock/label";
import { styles } from ".";
import { Card } from "~/components/bedrock/card";
import { ButtonGroup } from "~/components/button-group/button-group";
import { Button } from "~/components/bedrock/button";

export const Hero = () => (
  <div className={styles.wrapper}>
    <Label className={styles.label}>
      <BedrockText text="Better Bedrock" type="h2" font="Minecraft" />
    </Label>

    <Card className={styles.content}>
      <Card className={styles.sub} sub>
        <ButtonGroup>
          <Button type="white" className={styles.button} center>
            <BedrockText type="p" text="Mods" color="black" />
          </Button>
          <Button type="white" className={styles.button} center>
            <BedrockText type="p" text="Editor" color="black" />
          </Button>
          <Button type="white" className={styles.button} center>
            <BedrockText type="p" text="Settings" color="black" />
          </Button>
          <Button type="white" className={styles.button} center>
            <BedrockText type="p" text="Information" color="black" />
          </Button>
        </ButtonGroup>
      </Card>

      <ButtonGroup className={styles.tabs}>
        <Button type="dark" className={styles.button} center>
          <BedrockText type="p" text="Features" color="white" />
        </Button>
        <Button type="dark" className={styles.button} center>
          <BedrockText type="p" text="Compatibility" color="white" />
        </Button>
        <Button type="dark" className={styles.button} center>
          <BedrockText type="p" text="Config" color="white" />
        </Button>
      </ButtonGroup>
    </Card>
    {/* <HeroTitle /> */}
    {/* <HeroDescription /> */}
    {/* <HeroActions /> */}
  </div>
);
