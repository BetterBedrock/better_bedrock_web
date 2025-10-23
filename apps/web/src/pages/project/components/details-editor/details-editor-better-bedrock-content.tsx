import clsx from "clsx";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { CardDivider } from "~/components/bedrock/card";
import { InputSwitch } from "~/components/bedrock/input/input-switch";

import { styles, useDetailsEditorBetterBedrockContent } from ".";

export const DetailsEditorBetterBedrockContent = () => {
  const { handleSwitchBetterBedrock, selectedProject } = useDetailsEditorBetterBedrockContent();

  return (
    <>
      <CardDivider sub />
      <div className={clsx(styles.editor, styles.size)}>
        <BedrockText text="Better Bedrock Content" type="p" color="white" textAlign="left" />

        <InputSwitch
          placeholder="Better Bedrock Content"
          checked={selectedProject!.betterBedrockContent}
          onChange={handleSwitchBetterBedrock}
        />
      </div>
    </>
  );
};
