import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button, buttonTypes } from "@/shared/ui/button";
import { Popup, PopupProps } from "./popup";
import {
  PopupConfirmation,
  PopupConfirmationProps,
} from "./popup-confirmation";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

type PopupComponentsProps = PopupProps & PopupConfirmationProps;

const meta: Meta<PopupComponentsProps> = {
  title: "Overlay/Popup",
  component: Popup,
  parameters: {
    layout: "centered",
  },
  args: {
    title: "Example Title",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Popup.Body>
        <Popup.Part>
          <BedrockText type="p" textAlign="start" color="white">Example Description</BedrockText>
        </Popup.Part>
      </Popup.Body>
    ),
  },
};

export const Confirmation: Story = {
  args: {
    confirmText: "Submit",
    confirmType: "green",
    cancelText: "Cancel",
    ignore: false,
    description:
      "You are about to submit your project for the verification process, which may take up to 24 hours. If you are unsure or want to make a change, you can cancel the submission.",
  },
  argTypes: {
    confirmType: {
      control: "select",
      options: buttonTypes,
    },
  },
  render: (args) => (
    <PopupConfirmation {...args}>
      <Button width="100%" height="100%" type="white" center onClick={() => {}}>
        <BedrockText text="Text" type="p" color="black" />
      </Button>
    </PopupConfirmation>
  ),
};
