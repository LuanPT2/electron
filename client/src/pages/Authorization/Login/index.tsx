import React, { useEffect, useRef, useState } from 'react'
import Modal from 'components/Modal';
import LoginForm from './LoginForm';
import IMAGES from 'themes/images';
import { loginInfo, loginInfoError } from 'models/User';
import { ModalConfirm } from 'utils/types/commonType';

const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';


const Login = () => {

  const type = 'LOGIN_REQUEST_FAILED';

  const [loginInfo, setLoginInfo] = useState<loginInfo>({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [fieldError, setFieldError] = useState<loginInfoError>({
    username: false,
    password: false,
  });
  const [modalError, setModalError] = useState<ModalConfirm>({
    isShow: false,
    content: '',
    title: "gf",
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
        content: "TEST DATA CONTENT",
      });
    } else if (type === LOGIN_REQUEST_SUCCESS) {
      localStorage.setItem('toggleMenu', String(true));
    }
  }, [type]);

  const handleClickLogin = () => {
    const { username, password, rememberMe } = loginInfo;

  };

  const handlePressInput = (e: React.KeyboardEvent<HTMLInputElement>, name: string) => {
    switch (name) {
      case 'username':
        if (e.key === 'Enter') {
          passwordRef?.current?.focus();
        }
        break;

      case 'password':
        if (e.key === 'Enter') {
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
    </div>
  );
};

export default Login;
