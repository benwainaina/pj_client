import {createSlice} from '@reduxjs/toolkit';
import {actionLoginUser, actionSignupUser} from './actions';
import {IAuthSliceKey, IAuthState} from './interfaces';

const initialState: IAuthState = {
  isSigningUpUser: false,
  isLoggingInUser: false,
};

const sharedSlice = createSlice({
  name: IAuthSliceKey,
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(actionSignupUser.pending, (state, _action) => {
        state.isSigningUpUser = true;
      })
      .addCase(actionSignupUser.fulfilled, (state, _action) => {
        state.isSigningUpUser = false;
      })
      .addCase(actionSignupUser.rejected, (state, _action) => {
        state.isSigningUpUser = false;
      })
      .addCase(actionLoginUser.pending, (state, _action) => {
        state.isLoggingInUser = true;
      })
      .addCase(actionLoginUser.fulfilled, (state, _action) => {
        state.isLoggingInUser = false;
      })
      .addCase(actionLoginUser.rejected, (state, _action) => {
        state.isLoggingInUser = false;
      }),
});

export const authReducer = sharedSlice.reducer;
