import { useEffect, useState } from "react";
import { Button } from "../atoms";
import { useAuth } from "@/contexts";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.theme);

  const updateTheme = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const setMode = (mode: string) => {
    localStorage.setItem("theme", mode);
    updateTheme();
    setTheme(mode);
  };

  useEffect(() => updateTheme(), []);

  return (
    <nav className="card !rounded-none !p-0">
      <div className="mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">CRUD APP</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="theme" className="hidden md:block">
                Theme:
              </label>
              <select
                id="theme"
                name="theme"
                value={theme}
                className="font-bold text-sm border appearance-none bg-card outline-none focus:outline-none px-3 py-1 rounded"
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            {isAuthenticated && (
              <Button
                btnType="white"
                className="logout border-none shadow-none !bg-none "
                size="small"
                onClick={logout}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
