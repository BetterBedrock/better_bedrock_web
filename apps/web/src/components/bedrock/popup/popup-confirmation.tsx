import { ReactNode, useState, MouseEvent, cloneElement, ReactElement, Children } from "react";
import { styles } from ".";
import { Popup } from "~/components/bedrock/popup/popup";
import { Button, ButtonType } from "~/components/bedrock/button"; // Assuming a Button component exists
import React from "react";
import { ButtonGroup } from "~/components/button-group/button-group";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { CardDivider } from "~/components/bedrock/card";

interface PopupConfirmationProps {
  title?: string;
  description: string;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  ignore?: boolean;
  confirmType?: ButtonType;
}

export const PopupConfirmation = ({
  title = "Confirmation",
  description,
  ignore = false,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmType = "green",
}: PopupConfirmationProps) => {
  const [open, setOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Handle child click
  const handleChildClick = (originalOnClick?: (e: MouseEvent) => void) => (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Store the original click action
    setPendingAction(() => () => originalOnClick?.(e));
    setOpen(true);
  };

  // Enhance children with click handler
  const enhancedChildren = Children.map(children, (child) => {
    if (!React.isValidElement<{ onClick?: (e: MouseEvent) => void }>(child)) {
      return child;
    }

    return cloneElement(child as ReactElement<{ onClick?: (e: MouseEvent) => void }>, {
      onClick: handleChildClick(child.props.onClick),
    });
  });

  // Handle confirm action
  const handleConfirm = () => {
    pendingAction?.();
    setOpen(false);
    setPendingAction(null);
  };

  // Handle cancel action
  const handleCancel = () => {
    setOpen(false);
    setPendingAction(null);
  };

  return (
    <>
      {ignore ? children : enhancedChildren}
      {open && (
        <Popup title={title} onClose={handleCancel}>
          <div className={styles.container}>
            <div className={styles.part}>
              <BedrockText type="p" text={description} textAlign="start" color="white" />
            </div>

            <CardDivider />
            <div className={styles.part}>
              <ButtonGroup className={styles.group}>
                <Button onClick={handleCancel} type="white" center width="100%">
                  <BedrockText type="p" text={cancelText} color="black" />
                </Button>
                <Button onClick={handleConfirm} type={confirmType} center width="100%">
                  <BedrockText type="p" text={confirmText} color="white" />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};
