// front-end/src/hooks/useToast.ts
import { useState, useCallback } from "react";

interface Toast {
  message: string;
  type?: "success" | "error" | "info" | "warning";
}

export const useToast = () => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback(
    (message: string, type: Toast["type"] = "info") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  const success = useCallback(
    (message: string) => showToast(message, "success"),
    [showToast],
  );
  const error = useCallback(
    (message: string) => showToast(message, "error"),
    [showToast],
  );
  const info = useCallback(
    (message: string) => showToast(message, "info"),
    [showToast],
  );
  const warning = useCallback(
    (message: string) => showToast(message, "warning"),
    [showToast],
  );

  return { toast, success, error, info, warning };
};
