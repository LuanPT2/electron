

export type loginInfoError = {
  username: boolean;
  password: boolean;
};

export type loginInfo = {
  username: string;
  password: string;
  passwordText?: string;
  rememberMe: boolean;
};

export type InitialStateAuth = {
  type: string;
  isProcessing: boolean;
  statusCode: string;
  message: string;
  accessToken: string;
  user: UserInfo;
  isSuccess: boolean;
};

export type UserInfo = {
  email: string;
  userId: string;
  userName: string;
  unitId: string;
  unitName: string;
  unitTypeNm?: string;
  roleId: string;
  roleName: string;
  userType: string;
  departmentName: string;
  name: string;
  phone: string;
  status: number;
  remark: string;
  registId: string;
  registDt: string;
  updtId: string;
  updtDt: string;
  picOfUnit: boolean;
};

export type LoginRequestPayload = {
  username: string;
  password: string;
  rememberMe: boolean;
};

export type LoginRequestSuccessPayload = {
  timeStamp: string;
  status: string;
  message: string;
  data: {
    jwt: string;
    user: UserInfo;
  };
};

export type LoginRequestFailedPayload = {
  status: string;
  error: string;
};