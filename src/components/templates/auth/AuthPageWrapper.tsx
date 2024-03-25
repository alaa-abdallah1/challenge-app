import React from "react";
import { Link } from "react-router-dom";
import { AuthPageWrapperProps } from "@/types";

export const AuthPageWrapper: React.FC<AuthPageWrapperProps> = ({
  title,
  linkText,
  linkPath,
  children,
}) => {
  return (
    <div className="max-w-[600px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
        <h1 className="header">{title}</h1>
        <span className="text-xs space-x-2 font-mono">
          <span>{linkText}</span>
          <Link
            to={linkPath}
            className={`underline text-primary underline-offset-4 navigator-link`}
          >
            {linkPath === "/register" ? "Register" : "Login"}
          </Link>
        </span>
      </div>
      <div className="card w-full">{children}</div>
    </div>
  );
};
