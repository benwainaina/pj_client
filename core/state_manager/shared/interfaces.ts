export interface ISharedState {
  alertData: IAlertData | null;
  userToken?: string;
  tokenIsValidating: boolean;
  tokenIsValid: boolean;
}

export type TSuccessOrError = 'error' | 'success';

export interface IAlertData {
  /**
   * the type of alert to show
   */
  type?: TSuccessOrError;

  /**
   * optional message to display to the user
   */
  message?: string;

  /**
   * how long the alert will be shown
   */
  duration?: number;
}

export const ISharedSliceKey = 'sharedStateSlice';
