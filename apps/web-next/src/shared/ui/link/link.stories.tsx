import { BedrockText } from "@/shared/ui/bedrock-text";
import { Link } from "@/shared/ui/link";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

const meta: Meta<typeof Link> = {
  title: "Primitives/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    link: "https://betterbedrock.com",
    underlined: false,
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <BedrockText font="Minecraft">Example Link</BedrockText>
  },
};