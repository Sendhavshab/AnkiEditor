import  React, { useContext } from "react";


const HocCreater = (context: React.Context<any>) => {
  return function xyz(IncomingComponent: any) {
    return function p(prop:any) {
      const value = useContext(context);
      return <IncomingComponent {...value} {...prop}></IncomingComponent>;
    };
  };
};

export default HocCreater;