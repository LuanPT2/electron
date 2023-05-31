import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import {Routes, Route } from 'react-router-dom';
import Login from "pages/Authorization/Login";
import { API, ROUTES } from 'api/Api';
import { getCookie } from 'utils/helper/cookiesFunc';
import { useAppDispatch, useAppSelector } from 'utils/hook';
const [isAuth, setIsAuth] = useState(true);
const token = getCookie('token');
const { accessToken, user, isProcessing } = useAppSelector((state) => state.authReducer);

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
  if (
    pathname === MAIN ||
    (!isSystemRole && pathname.includes(SYSTEM)) ||
    (isWorkerAdminRole && pathname.includes(WORKER_USER)) ||
    [SYSTEM, WORKER, SUPPORT, USER].includes(pathname.substring(1, pathname.length - 1))
  ) {
    navigate(toPath);
    return;
  }
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
      dispatch(logoutRequest());
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
  dispatch(logoutRequest());
  setModal({
    ...modal,
    isShow: false,
  });
};

const Router = () => {
  return (
    <Routes>
          <Route path="/" element={<Login/>}></Route>
    </Routes>
  );
};

export default Router;