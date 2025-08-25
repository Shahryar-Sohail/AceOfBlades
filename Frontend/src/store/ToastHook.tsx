import { useState } from "react";

export function useToast() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  }

  const Toast = toastMessage ? (
    <div className="toast toast-top toast-start">
      <div className="alert alert-success">
        <span>{toastMessage}</span>
      </div>
    </div>
  ) : null;

  return { showToast, Toast };
}
