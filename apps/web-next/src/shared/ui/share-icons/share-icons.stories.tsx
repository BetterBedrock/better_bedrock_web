import { ShareIcons } from "@/shared/ui/share-icons/share-icons";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof ShareIcons> = {
  title: "Data Display/Share Icons",
  component: ShareIcons,
  parameters: {
    layout: "centered",
  },
  args: {
    center: false,
    projectId: "better_bedrock_texture_pack",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
