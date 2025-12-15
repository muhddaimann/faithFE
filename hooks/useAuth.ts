import { useAuthContext } from "../contexts/authContext";

export default function useAuth() {
  const { user, isAuthenticated, isReady, signIn, signUp, logout } =
    useAuthContext();

  return {
    user,
    isAuthenticated,
    isReady,
    signIn,
    signUp,
    logout,
  };
}
