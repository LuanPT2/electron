import React, { useState } from 'react';
// import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/Button';
import Input from 'components/Input';
import { loginInfo, loginInfoError } from 'models/User';
import CheckBox from 'components/Checkbox';
import IMAGES from 'themes/images';

type LoginFormProps = {
  loginInfo: loginInfo;
  fieldError: loginInfoError;
  onChangeLoginInfo: (value: string, name: string) => void;
  onClickLogin: () => void;
  passwordRef: React.RefObject<HTMLInputElement>;
  onKeyPressInput: (e: React.KeyboardEvent<HTMLInputElement>, name: string) => void;
  handleRememberMe: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const LoginForm = ({
  loginInfo,
  fieldError,
  onChangeLoginInfo,
  onClickLogin,
  passwordRef,
  onKeyPressInput,
  handleRememberMe,
}: LoginFormProps) => {
  return (
    <div className="form-wrapper">
      <div className="form-wrapper__box">
        <h4 className="">Sensor Control System</h4>
        <p>Tài khoảng</p>
        <div className="login-wrapper-input">
          <Input
            customClass={fieldError?.username ? 'is-invalid' : ''}
            placeholder=""
            type="text"
            value={loginInfo.username}
            onChange={(e) => onChangeLoginInfo(e.target.value, 'username')}
            id="username"
            onKeyPress={(e) => onKeyPressInput(e, 'username')}
            isIconLeft
            iconLeft={IMAGES.icon_user_login}
          />
        </div>
        <p>Mật mã</p>
        <div className="login-wrapper-input">
          <Input
            customClass={fieldError?.password ? 'is-invalid' : ''}
            placeholder=""
            type="password"
            onKeyPress={(e) => onKeyPressInput(e, 'password')}
            value={loginInfo.password}
            onChange={(e) => onChangeLoginInfo(e.target.value, 'password')}
            maxLength={16}
            id="password"
            alt="password"
            innerRef={passwordRef}
          />
          {/* <FontAwesomeIcon icon={faLock} /> */}
        </div>
        <CheckBox
          onChange={(e) => handleRememberMe(e)}
          id="1"
          isChecked={loginInfo.rememberMe}
          label="Tự động đăng nhập"
          name="rememberMe"
          customClassName="remember-me"
        />
        <Button onClick={onClickLogin} customClass="btn--primary button-login">
          Đăng Nhập
        </Button>
      </div>
      {/* <div className="form-wrapper__intro">
        <video autoPlay muted loop>
          <source type="video/mp4"  src={IMAGES.video_intro}></source>
        </video>
      </div> */}
    </div>
  );
};

export default LoginForm;
