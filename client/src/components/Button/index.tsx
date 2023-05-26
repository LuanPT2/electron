import { Button } from 'react-bootstrap';
import React from 'react';

type PrimaryButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  size?: 'sm' | 'lg' | undefined;
  variant?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  customClass?: string;
  children: React.ReactNode;
};

const PrimaryButton = ({
  onClick = () => null,
  disabled,
  size = 'sm',
  variant = '',
  type = 'button',
  customClass = '',
  children,
}: PrimaryButtonProps) => {
  return (
    <Button
      variant={variant}
      type={type}
      size={size}
      disabled={disabled}
      onClick={onClick}
      className={`${customClass}`}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
