import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login";
import Home from "./pages/user-portal/home";
import AuthLayout from "./components/auth-layout";
import UserLayout from "./components/user-layout";
import PrivateRoute from "./utils/privateRoute";
import Unauthorized from "./pages/unauthorize";

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
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
