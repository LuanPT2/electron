import ROUTERS from 'constants/routers';
import React from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouterProps = {
  isAuth: boolean;
  children: React.ReactNode;
};

const PrivateRouter = ({ isAuth, children }: PrivateRouterProps) => {
  if (!isAuth) {
    return <Navigate to={ROUTERS.LOGIN} replace />;
  }

  return <>{children}</>;
};

export default PrivateRouter;
