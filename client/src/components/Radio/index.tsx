// @flow
// libs
import React, { memo } from 'react';

type RadioProps = {
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  labelRadio: string;
  isChecked: boolean;
  id: string;
  value?: string;
  customClass?: string;
};

export const Radio = ({
  labelRadio,
  name = '',
  isChecked,
  onChange = () => null,
  id,
  disabled = false,
  value = '',
  customClass,
}: RadioProps) => {
  return (
    <div className={`wrap-radio ${customClass}`}>
      <label className="custom-radio d-flex" htmlFor={id}>
        <input
          type="radio"
          checked={isChecked}
          name={name}
          onChange={onChange}
          id={id}
          disabled={disabled}
          value={value}
        />
        <span className="checkmark" />
        <span className="label">{labelRadio}</span>
      </label>
    </div>
  );
};

export default memo(Radio);
