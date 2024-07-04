export interface ISignupUser {
  /**
   * username to identify the user
   */
  username: string;

  /**
   * email address of the user
   */
  email: string;

  /**
   * password of user
   */
  password: string;
}

export interface IUserCredentails {
  /**
   * email as the identifier of the user
   */
  email: string;

  /**
   * password
   */
  password: string;
}

export interface IAuthState {
  /**
   * creating account
   */
  isSigningUpUser: boolean;

  /**
   * logging in user
   */
  isLoggingInUser: boolean;
}

export const IAuthSliceKey = 'authStateSlice';
