import React, { ReactNode } from "react";
import { Button } from "../atoms";
import { ButtonType } from "@/types";

interface ModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  title?: string;
  saveBtnClass?: string;
  saveBtnText?: string;
  saveBtnType?: ButtonType;
  cancelTextBtn?: string;
  children: ReactNode;
  onClose: () => void;
  onSave: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  isLoading,
  isDisabled,
  saveBtnType = "primary",
  saveBtnClass,
  saveBtnText = "Save",
  cancelTextBtn = "Cancel",
  title = "Modal Title",
  onClose,
  onSave,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>

        <div className="card inline-block align-bottom text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full !p-0">
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="text-xl font-bold">{title}</h3>
            <Button
              size="small"
              btnType="white"
              className="px-3"
              onClick={onClose}
            >
              <span className="text-2xl">x</span>
            </Button>
          </div>
          <div className="p-4 min-h-24">{children}</div>
          <div className="flex justify-end p-4 gap-3 border-t">
            <Button btnType="default" onClick={onClose}>
              {cancelTextBtn}
            </Button>
            <Button
              type="submit"
              onClick={onSave}
              className={saveBtnClass}
              btnType={saveBtnType}
              isDisabled={isDisabled}
              isLoading={isLoading}
            >
              {saveBtnText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
