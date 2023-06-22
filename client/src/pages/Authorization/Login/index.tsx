import React, { useEffect, useRef, useState } from "react";
import LoginForm from "./components/LoginForm";
import { loginInfo, loginInfoError } from "models/User";
import Modal from "components/Modal";
import { ModalConfirm } from "utils/types/commonType";
import IMAGES from "themes/images";
import { REGEX } from "constants/regex";
import isEmpty from "lodash.isempty";
import { useAppDispatch, useAppSelector } from "utils/hook";
import { AppState } from "store/rootReducers";
import {
  loginRequest,
  resetTypeAuth,
} from "pages/Authorization/redux/actionCreators";

const LOGIN_REQUEST_SUCCESS = "LOGIN_REQUEST_SUCCESS";
const LOGIN_REQUEST_FAILED = "LOGIN_REQUEST_FAILED";

const Login = () => {
  const dispatch = useAppDispatch();

  const { type, message, isProcessing } = useAppSelector(
    (state: AppState) => state.authReducer
  );

  const [loginInfo, setLoginInfo] = useState<loginInfo>({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [fieldError, setFieldError] = useState<loginInfoError>({
    username: false,
    password: false,
  });

  const [modalError, setModalError] = useState<ModalConfirm>({
    isShow: false,
    content: "",
    title: "Thông báo",
  });

  const passwordRef = useRef<HTMLInputElement>(null);

  const handleChangeInfoLogin = (value: string, name: string) => {
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
    if (fieldError[name]) {
      setFieldError({
        ...fieldError,
        [name]: false,
      });
    }
  };

  useEffect(() => {
    if (type === LOGIN_REQUEST_FAILED) {
      setModalError({
        ...modalError,
        isShow: true,
        content: "Tài khoản hoặc mật khẩu không đúng.",
      });
    } else if (type === LOGIN_REQUEST_SUCCESS) {
      localStorage.setItem("toggleMenu", String(true));
    }
  }, [type]);

  const handleClickLogin = () => {
    const { username, password, rememberMe } = loginInfo;
    const error = {
      username: isEmpty(username) || !REGEX.VALIDATE_EMAIL.test(username),
      password: isEmpty(password) || !REGEX.PASSWORD.test(password),
    } as loginInfoError;

    if (!Object.values(error).every((value) => value === false)) {
      setFieldError(error);
      setModalError({
        isShow: true,
        content: "Lỗi Tài khoản và mật khẩu là bắt buộc",
      });
    } else {
      dispatch(loginRequest({ username, password: password, rememberMe }));

      // const xmlhttp = new XMLHttpRequest();
      // xmlhttp.onload = () => {
      //   dispatch(loginRequest({ username, password, rememberMe }));
      // };
      // xmlhttp.onerror = function () {
      //   setModalError({
      //     isShow: true,
      //     content: '네트워크 연결이 원활하지 않습니다. 잠시 후 다시 시도하세요.',
      //   });
      // };
      // xmlhttp.open('POST', API.getBaseURL() + 'auth/login', true);
      // xmlhttp.send();
    }
  };

  const handlePressInput = (
    e: React.KeyboardEvent<HTMLInputElement>,
    name: string
  ) => {
    switch (name) {
      case "username":
        if (e.key === "Enter") {
          passwordRef?.current?.focus();
        }
        break;

      case "password":
        if (e.key === "Enter") {
          handleClickLogin();
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className="login-page">
      <LoginForm
        loginInfo={loginInfo}
        onChangeLoginInfo={handleChangeInfoLogin}
        onClickLogin={handleClickLogin}
        passwordRef={passwordRef}
        onKeyPressInput={handlePressInput}
        {...{ fieldError }}
        handleRememberMe={(e) =>
          setLoginInfo({
            ...loginInfo,
            rememberMe: e.target.checked,
          })
        }
      />
      <Modal
        isOpen={modalError?.isShow}
        title="Thông Báo"
        handleSubmit={() => {
          setModalError({
            ...modalError,
            isShow: false,
          });
          dispatch(resetTypeAuth());
        }}
        textBtnRight="Kiểm tra"
      >
        {modalError.content}
      </Modal>
    </div>
  );
};

export default Login;
