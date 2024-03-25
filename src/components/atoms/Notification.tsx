import { NotificationProps } from "@/types";
import React from "react";

const notificationStyles = {
  error: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded ",
  success:
    "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded",
};

export const Notification: React.FC<NotificationProps> = ({
  message,
  type = "success",
}) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      className={`${notificationStyles[type]} absolute top-2 right-8`}
    >
      <span className="w-full notification">{message}</span>
    </div>
  );
};

export default Notification;
