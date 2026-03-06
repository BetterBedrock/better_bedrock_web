import { useEffect } from "react";

/**
 * Custom hook to trap focus within a specified element.
 *
 * Alternatives:
 * - Use `react-focus-lock` for a lightweight, pre-built solution.
 * - Use `@reach/dialog` for accessible modals with focus trapping.
 *
 * This implementation is efficient and avoids memory leaks. It is suitable
 * for scenarios where you want full control without adding dependencies.
 */
export const useFocusTrap = (ref: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const focusableElements = element.querySelectorAll<HTMLElement>(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    element.addEventListener("keydown", handleKeyDown);

    return () => {
      element.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref]);
};