import { fn } from "storybook/test";
import { BedrockText } from "./bedrock-text";
import type { ArgTypes, Meta, StoryObj } from "@storybook/nextjs-vite";

const argTypes: Partial<ArgTypes<React.ComponentProps<typeof BedrockText>>> = {
  type: {
    control: "select",
    options: ["h1", "h2", "h3", "h4", "p", "p2", "span"],
  },
  textAlign: {
    control: "select",
    options: ["left", "right", "center", "justify", "start", "end"],
  },
  text: { control: "text" },
  font: { control: "text" },
  color: { control: "color" },
  margin: { control: "text" },
  selectable: { control: "boolean" },
  shadow: { control: "boolean" },
  strong: { control: "boolean" },
  headerSize: { control: "boolean" },
  paragraphSize: { control: "boolean" },
};

const meta = {
  title: "Primitives/BedrockText",
  component: BedrockText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes,
} satisfies Meta<typeof BedrockText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "The quick brown fox jumps over the lazy dog",
    type: "p",
    color: "white",
  },
};

export const HeaderSize: Story = {
  args: {
    text: "Header sized paragraph",
    type: "p",
    color: "white",
    headerSize: true,
  },
};

export const Heading1: Story = {
  args: {
    text: "Heading 1",
    type: "h1",
    color: "white",
  },
};

export const Heading2: Story = {
  args: {
    text: "Heading 2",
    type: "h2",
    color: "white",
  },
};

export const Heading3: Story = {
  args: {
    text: "Heading 3",
    type: "h3",
    color: "white",
  },
};

export const Paragraph2: Story = {
  args: {
    text: "Smaller paragraph text",
    type: "p2",
    color: "white",
  },
};

export const Strong: Story = {
  args: {
    text: "Strong text",
    type: "p",
    color: "white",
    strong: true,
  },
};

export const WithShadow: Story = {
  args: {
    text: "Text with shadow",
    type: "p",
    color: "white",
    shadow: true,
  },
};

export const NonSelectable: Story = {
  args: {
    text: "You cannot select this text",
    type: "p",
    color: "white",
    selectable: false,
  },
};

export const Clickable: Story = {
  args: {
    text: "Click me",
    type: "p",
    color: "white",
    onClick: fn(),
  },
};