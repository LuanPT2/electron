import React from 'react';
import { ChangeEvent, InputHTMLAttributes, KeyboardEvent, memo, RefObject } from 'react';
import IMAGES from 'themes/images';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  value: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  type: string;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
  request?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  label?: string;
  errorMsg?: string;
  customClass?: string;
  customClassLabel?: string;
  innerRef?: RefObject<HTMLInputElement>;
  isIconLeft?: boolean;
  iconLeft?: string;
  handleClickIcon?: () => void;
  isClickSearch?: boolean;
};

const Input = ({
  value = '',
  type,
  onChange = () => null,
  onFocus,
  onBlur,
  placeholder,
  onKeyPress,
  disabled,
  readOnly,
  label,
  customClassLabel = '',
  request,
  customClass = '',
  innerRef,
  isIconLeft,
  iconLeft,
  handleClickIcon = () => null,
  isClickSearch,
  ...rest
}: InputProps) => {
  return (
    <div className="input__wrapper">
      {label && (
        <p className={`${customClassLabel} input__label`}>
          {label}
          {request && <span className="request">*</span>}
        </p>
      )}
      <div className="input__box">
        <label htmlFor={`${label || label === '' ? label : placeholder}`} className="d-none">{`${
          label ? label : placeholder
        }`}</label>
        {isIconLeft && (
          <img
            src={iconLeft}
            alt={`${label !== '' ? label : placeholder}`}
            className="input__box__icon-left"
            onClick={handleClickIcon}
          />
        )}
        <input
          className={`input-group ${customClass}`}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          onKeyPress={onKeyPress}
          disabled={disabled}
          readOnly={readOnly}
          ref={innerRef}
          alt={`${label ? label : placeholder}`}
          inputMode={String(type) === 'number' ? 'numeric' : 'text'}
          id={`${label || label === '' ? label : placeholder}`}
          autoComplete="off"
          onClick={() => {
            if (isClickSearch && !rest.onClick && isIconLeft && iconLeft === IMAGES.icon_search && handleClickIcon) {
              return handleClickIcon();
            }
            if (rest.onClick) {
              return rest.onClick;
            }
          }}
          {...rest}
        />
      </div>
    </div>
  );
};

export default memo(Input);
