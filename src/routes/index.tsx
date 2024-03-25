import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/NotFound";

const routes = [
  {
    path: "/",
    element: <Dashboard />,
    protected: true,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    protected: true,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  { path: "/", element: <Register /> },

  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
