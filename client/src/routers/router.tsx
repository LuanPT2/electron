import ROUTERS from 'constants/routers';
import { useEffect, useState } from 'react';
import {Navigate, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Login from "pages/Authorization/Login";
import DashBoard from "pages/DashBoard";
import { API, ROUTES } from 'api/Api';
import { getCookie } from 'utils/helper/cookiesFunc';
import { useAppDispatch, useAppSelector } from 'utils/hook';
import PrivateRouter from './PrivateRouter';
import NotFound from 'components/NotFound';
import MainLayout from 'components/Layout';

const Router = () => {
  const [isAuth, setIsAuth] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const {accessToken, user } = useAppSelector((state) => state.authReducer);
  const token = getCookie('token');
  const toPath = `/`;

  useEffect(() => {
    if (token && accessToken) {
      setIsAuth(!!token);
      // set Authorization Header
      API.setHeader('x-access-token', `${token}`);
    } else {
      setIsAuth(false);
    }
  }, [accessToken, token]);
  
  useEffect(() => {
    if (pathname?.includes('form')) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    //navigate(toPath);
    return;
  }, [pathname]);
  
  const reqInterceptor = API.axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      return Promise.reject(err);
    },
  );
  
  const resInterceptor = API.axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const status = error.response.status;
      if (error?.message == 'Network Error' || status === 401 || status === 500) {
        //dispatch(logoutRequest()); TODO
        return Promise.reject(error);
      }
      return Promise.reject(error);
    },
  );
  
  useEffect(() => {
    return () => {
      API.axiosInstance.interceptors.request.eject(reqInterceptor);
      API.axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);
  
  const handleModalSubmit = () => {
    //dispatch(logoutRequest()); TODO
   // setModal({
   //   ...modal,
   //   isShow: false,
    //});
  };
  return (
    <Routes>
      <Route path={ROUTERS.LOGIN} element={isAuth ? <Navigate to={toPath} replace /> : <Login />}></Route>
      <Route path={ROUTERS.MAIN} element={
          <PrivateRouter {...{ isAuth }}>
            <MainLayout />
          </PrivateRouter>
      }>

      </Route>
      <Route path="*" element={<NotFound {...{ toPath }} />} />
    </Routes>
  );
};

export default Router;