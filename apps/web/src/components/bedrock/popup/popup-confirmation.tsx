import { ReactNode, useState, MouseEvent, cloneElement, ReactElement, Children } from "react";
import { styles } from ".";
import { Popup } from "~/components/bedrock/popup/popup";
import { Button, ButtonType } from "~/components/bedrock/button";
import React from "react";
import { ButtonGroup } from "~/components/button-group/button-group";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { CardDivider } from "~/components/bedrock/card";

type ClickableElementProps = {
  onClick?: (e: MouseEvent) => void;
  children?: ReactNode;
};

export const useEnhanceTree = (
  handleChildClick: (originalOnClick?: (e: MouseEvent) => void) => (e: MouseEvent) => void,
) => {
  const enhanceTree = (node: ReactNode): ReactNode => {
    if (!React.isValidElement(node)) return node;

    const element = node as ReactElement<ClickableElementProps>;
    const props: Partial<ClickableElementProps> = {};

    if (typeof element.props.onClick === "function") {
      props.onClick = handleChildClick(element.props.onClick);
    }

    if (element.props.children) {
      props.children = Children.map(element.props.children, enhanceTree);
    }

    return cloneElement(element, props);
  };

  return enhanceTree;
};

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

  // Wrap any onClick with confirmation logic
  const handleChildClick = (originalOnClick?: (e: MouseEvent) => void) => (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setPendingAction(() => () => originalOnClick?.(e));
    setOpen(true);
  };

  // Recursively enhance children
  const enhanceTree = useEnhanceTree(handleChildClick);
  const enhancedChildren = ignore ? children : enhanceTree(children);

  const handleConfirm = () => {
    pendingAction?.();
    setOpen(false);
    setPendingAction(null);
  };

  const handleCancel = () => {
    setOpen(false);
    setPendingAction(null);
  };

  return (
    <div className={styles.confirmation}>
      {enhancedChildren}
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
    </div>
  );
};
