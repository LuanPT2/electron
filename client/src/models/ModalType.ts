export type ModalProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
  animation?: boolean;
  isShowCloseIcon?: boolean;
  handleCloseIcon?: () => void;
  handleClose?: () => void;
  isOpen: boolean;
  size?: 'sm' | 'lg' | 'xl' | undefined;
  customClass?: string;
  isShowTwoBtn?: boolean;
  textBtnLeft?: string;
  classNameBtnLeft?: string;
  classNameBtnRight?: string;
  textBtnRight?: string;
  handleSubmit?: () => void;
  isShowFooter?: boolean;
  isShowIconCircleClose?: boolean;
  isClickOutside?: boolean;
  isDisableButtonRight?: boolean;
  isDisableOneButton?: boolean;
};

export type ModalOneButton = {
  title: string;
  content: string;
  isShow: boolean;
  textButton: string;
  type?: string;
};

export type ModalTwoButton = {
  type: string;
  title: string;
  content: string;
  isShow: boolean;
  textButtonLeft: string;
  textButtonRight: string;
};

export type ModalConfirm = {
  isOpen: boolean;
  content: string;
  handleConfirm?: () => void;
};
