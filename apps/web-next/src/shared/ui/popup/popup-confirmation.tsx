"use client";

import {
  ReactNode,
  useState,
  MouseEvent,
  cloneElement,
  ReactElement,
  Children,
  isValidElement,
} from "react";
import clsx from "clsx";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { ButtonType, Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group/button-group";
import { Card, CardBody, CardDivider } from "@/shared/ui/card";

import { Popup, styles } from ".";

type ClickableElementProps = {
  onClick?: (e: MouseEvent) => void;
  children?: ReactNode;
};

export const useEnhanceTree = (
  handleChildClick: (
    originalOnClick?: (e: MouseEvent) => void,
  ) => (e: MouseEvent) => void,
) => {
  const enhanceTree = (node: ReactNode): ReactNode => {
    if (!isValidElement(node)) return node;

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
  className?: string;
}

export const PopupConfirmation = ({
  title = "Confirmation",
  description,
  ignore = false,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmType = "green",
  className,
}: PopupConfirmationProps) => {
  const [open, setOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Wrap any onClick with confirmation logic
  const handleChildClick =
    (originalOnClick?: (e: MouseEvent) => void) => (e: MouseEvent) => {
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
    <div className={clsx(styles.confirmation, className && className)}>
      {enhancedChildren}
      {open && (
        <Popup title={title} onClose={handleCancel}>
          <div className={styles.container}>
            <div className={styles.part}>
              <Card>
                <CardBody>
                  <Popup.Content>
                    <BedrockText
                      type="p"
                      text={description}
                      textAlign="start"
                      color="white"
                    />
                  </Popup.Content>
                </CardBody>
              </Card>
            </div>

            <div className={styles.part}>
              <Card sub negativeMarginTop>
                <CardBody>
                  <Popup.Content>
                    <ButtonGroup className={styles.group}>
                      <Button
                        onClick={handleCancel}
                        type="white"
                        center
                        width="100%"
                      >
                        <BedrockText type="p" text={cancelText} color="black" />
                      </Button>
                      <Button
                        onClick={handleConfirm}
                        type={confirmType}
                        center
                        width="100%"
                      >
                        <BedrockText
                          type="p"
                          text={confirmText}
                          color="white"
                        />
                      </Button>
                    </ButtonGroup>
                  </Popup.Content>
                </CardBody>
              </Card>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};
