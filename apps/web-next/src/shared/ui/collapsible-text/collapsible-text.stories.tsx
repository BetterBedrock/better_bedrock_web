import { Card } from "@/shared/ui/card";
import { CollapsibleText } from "@/shared/ui/collapsible-text/collapsible-text";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Layout/CollapsibleText",
  component: CollapsibleText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CollapsibleText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card style={{ width: "400px" }}>
      <Card.Body>
        <Card.Item>
          <CollapsibleText {...args} />
        </Card.Item>
      </Card.Body>
    </Card>
  ),
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
};
