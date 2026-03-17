import { buttonTypes } from "@/shared/ui/button";
import { Collapsible } from "@/shared/ui/collapsible";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

const meta: Meta<typeof Collapsible> = {
  title: "Layout/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    headerText: { control: "text" },
    contentText: { control: "text" },
    width: { control: "text" },
    contentHeight: { control: "text" },
    floating: { control: "boolean" },
    limit: { control: "boolean" },
    type: {
      control: "select",
      options: buttonTypes,
    },
  },
  args: {
    headerText: "Example Header Text",
    contentText: "Example Content Text",
    type: "dark",
    onOpenChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Floating: Story = {
  args: { floating: true },
};
