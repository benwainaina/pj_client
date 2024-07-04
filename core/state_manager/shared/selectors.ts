import {createSelector} from '@reduxjs/toolkit';
import {IStore} from '../store';

const sharedState = (state: IStore) => state.sharedStateSlice;

/**
 * whether token is being validated
 */
export const selectIsValidatingToken = createSelector(sharedState, state => {
  return state.tokenIsValidating;
});

/**
 * get the token validity
 */
export const selectUserTokenValidity = createSelector(
  sharedState,
  state => state.tokenIsValid,
);

/**
 * get the value for the user token
 */
export const selectUserTokenValue = createSelector(
  sharedState,
  state => state.userToken || '',
);

/**
 * select the alert data
 */
export const selectAlertData = createSelector(
  sharedState,
  state => state.alertData,
);
