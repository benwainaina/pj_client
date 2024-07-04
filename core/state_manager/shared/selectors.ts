import {createSelector} from '@reduxjs/toolkit';
import {IStore} from '../store';

const userState = (state: IStore) => state.sharedStateSlice;

/**
 * whether token is being validated
 */
export const selectIsValidatingToken = createSelector(userState, state => {
  return state.tokenIsValidating;
});

/**
 * get the token validity
 */
export const selectUserTokenValidity = createSelector(
  userState,
  state => state.tokenIsValid,
);

/**
 * get the value for the user token
 */
export const selectUserTokenValue = createSelector(
  userState,
  state => state.userToken,
);
