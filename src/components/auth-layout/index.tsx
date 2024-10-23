import { Outlet } from "react-router";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { USER_PROFILE } from "../../utils/api/userApi";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { data: userProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => USER_PROFILE(),
  });

  if (userProfile) {
    navigate(-1);
  }

  return (
    <div className="relative">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
