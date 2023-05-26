
export type StringOrNumber = number | string;

export type ModalConfirm = {
  isShow: boolean;
  content: string;
  title?: string;
  type?: string;
  value?: string;
  data?: object;
  nameDelete?: string;
  isForm?: boolean;
};
