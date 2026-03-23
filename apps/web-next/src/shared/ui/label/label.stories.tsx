import { BedrockText } from "@/shared/ui/bedrock-text";
import { Label } from "@/shared/ui/label";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Label> = {
  title: "Primitives/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <BedrockText font="Minecraft">Example Header</BedrockText>
  },
};