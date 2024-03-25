import { ReactNode } from "react";

export interface Notification {
  message: string | ReactNode;
  type?: NotificationType;
  className?: string;
}

export interface NotificationProps extends Notification {}

export type NotificationType = "error" | "success";

export interface NotificationContextType {
  showMessage: (args: Notification) => void;
}

export interface UseNotificationReturn
  extends Notification,
    NotificationContextType {
  clearMessage: () => void;
}

export interface NotificationProviderProps {
  children: ReactNode;
}
