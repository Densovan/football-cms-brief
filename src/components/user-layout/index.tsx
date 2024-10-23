import { Outlet } from "react-router";
import Header from "./navbar";

const UserLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default UserLayout;
