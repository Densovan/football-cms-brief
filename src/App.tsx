import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login";
import Home from "./pages/user-portal/home";
import AuthLayout from "./components/auth-layout";
import UserLayout from "./components/user-layout";
import PrivateRoute from "./utils/privateRoute";
import Unauthorized from "./pages/unauthorize";
import Test from "./pages/test";

function App() {
  const router = createBrowserRouter([
    {
      path: "/unauthorized",
      element: <Unauthorized />,
    },
    //AuthRoutes
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/test",
          element: <Test />,
        },
      ],
    },
    //User Layout
    {
      element: (
        <PrivateRoute requiredRoles={["user", "admin"]}>
          <UserLayout />
        </PrivateRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    //Public Routes
    {
      element: (
        <div>
          <Outlet />
        </div>
      ),
      children: [
        {
          path: "/",
          element: <Test />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
