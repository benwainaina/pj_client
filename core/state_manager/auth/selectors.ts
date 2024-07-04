import {createSelector} from '@reduxjs/toolkit';
import {IStore} from '../store';

const authState = (state: IStore) => state.authStateSlice;

/**
 * whether the user is signing up
 */
export const selectUserIsSigningUp = createSelector(
  authState,
  state => state.isSigningUpUser,
);

/**
 * whether the user is logging in
 */
export const selectUserIsLogginIn = createSelector(
  authState,
  state => state.isLoggingInUser,
);
