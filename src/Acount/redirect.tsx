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
  const [searchParams] = useSearchParams()
  if (!token) {
    const params = Object.fromEntries(searchParams);
    const pathName = window.location.pathname

    return(
      <Navigate to={{pathname:"/login",search:new URLSearchParams({ ...params, next: pathName }).toString()}} />
    )
    
  }
  return <>{children}</>;
};

export default UserAccountProviderHOC(RedirectLogin);

const RedirectHome: React.FC<RedirectProps> = ({ children, token }) => {

  
  const [searchParams] = useSearchParams();
  if (token) {
  
    const nextPath = Object.fromEntries(searchParams).next;
    return <Navigate to={nextPath} />;
  }
  return <>{children}</>;
};

export const RedirectHomeHOC = UserAccountProviderHOC(RedirectHome);
