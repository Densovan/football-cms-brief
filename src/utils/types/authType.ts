export type AuthLoginForm = {
  email: string;
  password: string;
};

export interface AuthSignupForm extends AuthLoginForm {
  email: string;
}

export interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;

  accessKey: string | null;
  setAccessKey: (accessKey: string) => void;
  clearAccessKey: () => void;

  tempToken: string | null;
  setTempToken: (tempToken: string) => void;
  clearTempToken: () => void;

  userProfile: any;
  setUserProfile: (profile: any) => void;
}

export type LoginType = {
  message: string;
  token: string;
  user: {
    fullName: string;
    email: string;
    role: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type Profile = {
  fullName: string;
  email: string;
  role: [string];
  avatar: string;
  createdAt: string;
  updatedAt: string;
};

export type NewPasswordType = {
  password: string;
  confirmPassword: string;
};
