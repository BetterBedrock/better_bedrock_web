import { Button } from "../button";
import { ButtonGroup } from "./button-group";
import type { ArgTypes, Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["horizontal", "vertical", "responsive"],
    },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleButtons = [
  <Button key={1} type="green">
    Confirm
  </Button>,
  <Button key={2} type="white">
    Cancel
  </Button>,
  <Button key={3} type="red">
    Delete
  </Button>,
];

export const Responsive: Story = {
  render: (args) => <ButtonGroup {...args}>{SampleButtons}</ButtonGroup>,
  args: {
    direction: "responsive",
  },
};

export const Horizontal: Story = {
  render: (args) => <ButtonGroup {...args}>{SampleButtons}</ButtonGroup>,
  args: {
    direction: "horizontal",
  },
};

export const Vertical: Story = {
  render: (args) => <ButtonGroup {...args}>{SampleButtons}</ButtonGroup>,
  args: {
    direction: "vertical",
  },
};

export const TwoButtons: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button type="green">Save</Button>
      <Button type="white">Discard</Button>
    </ButtonGroup>
  ),
  args: {
    direction: "horizontal",
  },
};

export const SingleButton: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button type="green">Submit</Button>
    </ButtonGroup>
  ),
  args: {
    direction: "horizontal",
  },
};
