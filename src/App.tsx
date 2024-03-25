import routes from "@/routes";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/molecules/Navbar";
import { ProtectedRoute, AuthRedirect } from "@/components";

function App() {
  return (
    <div id="app">
      <Navbar />

      <main>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <div className="px-4 py-6 md:p-8 w-full">
                  {route?.protected ? (
                    <ProtectedRoute>{route.element}</ProtectedRoute>
                  ) : (
                    <AuthRedirect>{route.element}</AuthRedirect>
                  )}
                </div>
              }
            />
          ))}
        </Routes>
      </main>
    </div>
  );
}

export default App;
