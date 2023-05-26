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
        <p>아이디</p>
        <div className="login-wrapper-input">
          <Input
            customClass={fieldError?.username ? 'is-invalid' : ''}
            placeholder="User"
            type="text"
            value={loginInfo.username}
            onChange={(e) => onChangeLoginInfo(e.target.value, 'username')}
            id="username"
            onKeyPress={(e) => onKeyPressInput(e, 'username')}
            isIconLeft
            iconLeft={IMAGES.icon_user_login}
          />
        </div>
        <p>비밀번호</p>
        <div className="login-wrapper-input">
          <Input
            customClass={fieldError?.password ? 'is-invalid' : ''}
            placeholder="Password (8 - 16)"
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
          label="자동 로그인"
          name="rememberMe"
          customClassName="remember-me"
        />
        <Button onClick={onClickLogin} customClass="btn--primary button-login">
          로그인
        </Button>
      </div>
      <div className="form-wrapper__intro">
        <img src={IMAGES.icon_logo_login} />
      </div>
    </div>
  );
};

export default LoginForm;
