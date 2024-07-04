export interface ISharedState {
  alertData: IAlertData;
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

  /**
   * whether the alert is shown or not
   */
  show: boolean;
}

export const ISharedSliceKey = 'sharedStateSlice';
