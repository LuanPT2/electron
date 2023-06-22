import { useState } from "react";
import "./_styles.scss";
import { ChangeEvent } from "react";

export type ToggleSwitchProps = {
  isChecked?: boolean;
  isDisabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string | undefined;
  id: string | undefined;
  readOnly?: boolean;
};

const ToggleSwitch = ({
  isChecked,
  isDisabled,
  onChange,
  name,
  id,
  ...rest
}: ToggleSwitchProps) => {
  return (
    <div>
      <label className="switch">
        <input
          className="checkbox"
          title="checkbox"
          type="checkbox"
          id={id}
          name={name}
          disabled={isDisabled}
          checked={isChecked}
          onChange={onChange}
          {...rest}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
