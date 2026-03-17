import { BedrockText } from "@/shared/ui/bedrock-text";
import { SimpleButton } from "@/shared/ui/simple-button/simple-button";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

const meta: Meta<typeof SimpleButton> = {
  title: "Primitives/Simple Button",
  component: SimpleButton,
  parameters: {
    layout: "centered",
  },
  args: {
    height: "auto",
    width: "auto",
    isClicked: false,
    transparent: false,
    onTap: fn(),
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <BedrockText>Example Text</BedrockText>
  }
};
