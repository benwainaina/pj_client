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
      .addCase(actionSignupUser.pending, (state, action) => {
        state.isSigningUpUser = true;
      })
      .addCase(actionSignupUser.fulfilled, (state, action) => {
        state.isSigningUpUser = false;
      })
      .addCase(actionSignupUser.rejected, (state, action) => {
        state.isSigningUpUser = false;
      })
      .addCase(actionLoginUser.pending, (state, action) => {
        state.isLoggingInUser = true;
      })
      .addCase(actionLoginUser.fulfilled, (state, action) => {
        state.isLoggingInUser = false;
      })
      .addCase(actionLoginUser.rejected, (state, action) => {
        state.isLoggingInUser = false;
      }),
});

export const authReducer = sharedSlice.reducer;
