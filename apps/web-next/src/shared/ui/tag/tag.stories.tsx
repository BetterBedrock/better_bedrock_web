import { borders, Tag } from "@/shared/ui/tag";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

const meta: Meta<typeof Tag> = {
  title: "Primitives/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    border: {
      control: "multi-select",
      options: borders,
    },
    deletable: {
      control: "boolean",
    },
  },
  args: {
    name: "Example Tag",
    onDelete: fn(),
    border: ["all"],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
