import {createSlice} from '@reduxjs/toolkit';
import {IAlertData, ISharedSliceKey, ISharedState} from './interfaces';
import {actionValidateToken} from '../home/actions';

const initialState: ISharedState = {
  alertData: {show: false},
  tokenIsValidating: false,
  tokenIsValid: false,
};

const sharedSlice = createSlice({
  name: ISharedSliceKey,
  initialState,
  reducers: {
    setAlertData(state, action: {payload: IAlertData}) {
      state.alertData = action.payload;
    },
    clearAlertData(state, _action) {
      state.alertData = null;
    },
    setUserToken(state, action: {payload: {userToken: string}}) {
      state.userToken = action.payload.userToken;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(actionValidateToken.pending, (state, action) => {
        state.tokenIsValidating = true;
      })
      .addCase(actionValidateToken.fulfilled, (state, action) => {
        state.tokenIsValidating = false;
      })
      .addCase(actionValidateToken.rejected, (state, action) => {
        state.tokenIsValidating = false;
        state.tokenIsValid = false;
      }),
});

export const {setAlertData, clearAlertData, setUserToken} = sharedSlice.actions;

export const sharedReducer = sharedSlice.reducer;
