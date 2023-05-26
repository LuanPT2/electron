import React from 'react';
import { ChangeEvent } from 'react';

export type CheckBoxProps = {
  isChecked?: boolean;
  label?: string | number;
  isDisabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string | undefined;
  id: string | undefined;
  customClassName?: string;
  readOnly?: boolean;
  isSmall?: boolean;
};

const CheckBox = ({
  isChecked,
  label,
  isDisabled,
  onChange,
  name,
  id,
  customClassName = '',
  isSmall = false,
  ...rest
}: CheckBoxProps) => {
  return (
    <div
      className={`my-checkbox flex-center${isChecked ? ' my-checkbox--checked' : ''}${
        isSmall ? ' checkbox-small' : ''
      }${isDisabled ? 'disabled' : ''} ${customClassName}`}
    >
      <input
        className="my-checkbox__input cursor-pointer"
        title="checkbox"
        type="checkbox"
        id={id}
        name={name}
        disabled={isDisabled}
        checked={isChecked}
        onChange={onChange}
        {...rest}
      />
      <label className="my-checkbox__label cursor-pointer" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
