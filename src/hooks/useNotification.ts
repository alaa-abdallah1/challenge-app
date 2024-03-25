import { Notification, NotificationType, UseNotificationReturn } from "@/types";
import { useState } from "react";

export const useNotification = (): UseNotificationReturn => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("success");

  const showMessage = ({ message, type }: Notification) => {
    setMessage(message);
    setType(type as NotificationType);
    setTimeout(() => {
      clearMessage();
    }, 3000); // Auto-hide after 3 seconds
  };

  const clearMessage = () => {
    setMessage("");
    setType("success"); // Reset type to default
  };

  return { message, type, showMessage, clearMessage };
};
