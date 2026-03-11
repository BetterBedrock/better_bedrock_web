import { CircularProgressIndicator } from "./circular-progress-indicator";
import type { ArgTypes, Meta, StoryObj } from "@storybook/nextjs-vite";

const argTypes: Partial<
  ArgTypes<React.ComponentProps<typeof CircularProgressIndicator>>
> = {
  size: {
    control: "select",
    options: ["small", "medium", "large"],
  },
  center: { control: "boolean" },
};

const meta = {
  title: "Components/CircularProgressIndicator",
  component: CircularProgressIndicator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes,
} satisfies Meta<typeof CircularProgressIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "medium",
    center: false,
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const Centered: Story = {
  args: {
    size: "medium",
    center: true,
  },
};
