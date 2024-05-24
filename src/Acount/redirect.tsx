import { Navigate } from "react-router-dom";
import { UserAccountProviderHOC } from "../HOC&Context/Context";

interface RedirectProps {
  children: React.ReactNode;
  token: string | null;
}

const RedirectLogin: React.FC<RedirectProps> = ({ children, token }) => {
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default UserAccountProviderHOC(RedirectLogin);

const RedirectHome: React.FC<RedirectProps> = ({ children, token }) => {
  if (token) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export const RedirectHomeHOC = UserAccountProviderHOC(RedirectHome);
