import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { UserAccountProviderHOC } from "../HOC&Context/Context";

interface RedirectProps {
  children: React.ReactNode;
  token: string | null;
}

const RedirectLogin: React.FC<RedirectProps> = ({ children, token }) => {


  
  const IsCodeShared = useParams().didshare;

  
  if(IsCodeShared){
    return <>{children}</>;
  }
  if (!token) {
    const [searchParams] = useSearchParams()
    const params = Object.fromEntries(searchParams);
    const pathName = window.location.pathname
    
    return (
      <Navigate
        to={`/login/?${new URLSearchParams({ ...params, next: pathName })}`}
      />
    );
  }
  return <>{children}</>;
};

export default UserAccountProviderHOC(RedirectLogin);

const RedirectHome: React.FC<RedirectProps> = ({ children, token }) => {

  
  if (token) {
  
    const [searchParams] = useSearchParams();
    const nextPath = Object.fromEntries(searchParams).next;
    return <Navigate to={nextPath} />;
  }
  return <>{children}</>;
};

export const RedirectHomeHOC = UserAccountProviderHOC(RedirectHome);
