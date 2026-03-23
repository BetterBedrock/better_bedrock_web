import { BedrockText } from "@/shared/ui/bedrock-text";
import { Tooltip } from "@/shared/ui/tooltip/tooltip";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Tooltip> = {
  title: "Overlay/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    text: "Tooltip Text",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <BedrockText color="white">Hover On Me</BedrockText>
  }
};
