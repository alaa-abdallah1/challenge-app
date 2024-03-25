import { useNotification } from "@/hooks";
import { Notification } from "@/components";
import React, { createContext, useContext } from "react";
import { NotificationContextType, NotificationProviderProps } from "@/types";

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const { message, type, showMessage } = useNotification();

  return (
    <NotificationContext.Provider value={{ showMessage }}>
      {children}
      <Notification message={message} type={type} />
    </NotificationContext.Provider>
  );
};

export const useGlobalNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useGlobalNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
