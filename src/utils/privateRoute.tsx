import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"; // Import the Zustand store
import { useQuery } from "@tanstack/react-query";
import { USER_PROFILE } from "./api/userApi";

interface Props {
  requiredRoles?: string[];
  children?: JSX.Element;
}

const ProtectedRoute = ({ children, requiredRoles = [] }: Props) => {
  const { setUserProfile } = useAuthStore(); // Access auth state from Zustand store

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => USER_PROFILE(),
  });

  useEffect(() => {
    if (profile) {
      setUserProfile(profile);
    }
  }, [profile]);

  if (isLoading) {
    return "loading..";
  }

  // If not authenticated, redirect to login
  if (!profile) {
    return <Navigate to="/login" />;
  }

  if (
    requiredRoles.length &&
    !profile?.role.some((roles) => requiredRoles.includes(roles))
  ) {
    return <Navigate to="/unauthorized" />; // Redirect to unauthorized page
  }
  // console.log(profile?.roles.some((role) => requiredRoles.includes(role)));
  // If authenticated and has permission, render the component
  return children;
};

export default ProtectedRoute;
