import { Input } from "@/shared/ui/input";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Input> = {
  title: "Inputs/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Switch: Story = {
  render: () => <Input.Switch />,
  args: {},
}