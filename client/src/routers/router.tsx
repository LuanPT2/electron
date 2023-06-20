import ROUTERS from "constants/routers";
import { useEffect, useState, Suspense } from "react";
import {
  Navigate,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "pages/Authorization/Login";
import { API, ROUTES } from "api/Api";
import { getCookie } from "utils/helper/cookiesFunc";
import { useAppDispatch, useAppSelector } from "utils/hook";
import PrivateRouter from "./PrivateRouter";
import NotFound from "components/NotFound";
import MainLayout from "components/Layout";
import { logoutRequest } from "pages/Authorization/redux/actionCreators";
import Modal from "components/Modal";

const Router = () => {
  const [isAuth, setIsAuth] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.authReducer);
  const token = getCookie("token");
  const toPath = `/`;

  useEffect(() => {
    if (token && accessToken) {
      setIsAuth(!!token);
      // set Authorization Header
      API.setHeader("x-access-token", `${token}`);
    } else {
      setIsAuth(false);
    }
  }, [accessToken, token]);

  // useEffect(() => {
  //   if (pathname?.includes("form")) {
  //     window.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //     });
  //   }
  //   navigate(toPath);
  //   return;
  // }, [pathname]);

  const reqInterceptor = API.axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const resInterceptor = API.axiosInstance.interceptors.response.use(
    (response) => {
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 202 ||
        response.status === 204
      ) {
        return response;
      }
      return Promise.reject(response);
    },
    (error) => {
      const status = error.response.status;
      if (
        error?.message == "Network Error" ||
        status === 401 ||
        status === 404 ||
        status === 500
      ) {
        dispatch(logoutRequest());
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    return () => {
      API.axiosInstance.interceptors.request.eject(reqInterceptor);
      API.axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  return (
    <Routes>
      <Route
        path={ROUTERS.LOGIN}
        element={isAuth ? <Navigate to={toPath} replace /> : <Login />}
      ></Route>
      <Route
        path={ROUTERS.MAIN}
        element={
          <PrivateRouter {...{ isAuth }}>
            <MainLayout />
          </PrivateRouter>
        }
      ></Route>
      <Route path="*" element={<NotFound {...{ toPath }} />} />
    </Routes>
  );
};

export default Router;
