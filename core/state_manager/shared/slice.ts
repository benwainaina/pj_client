import {createSlice} from '@reduxjs/toolkit';
import {IAlertData, ISharedSliceKey, ISharedState} from './interfaces';
import {actionValidateToken} from './actions';

const initialState: ISharedState = {
  alertData: {},
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
    setUserToken(
      state,
      action: {payload: {userToken: string; isValid: boolean}},
    ) {
      state.userToken = action.payload.userToken;
      state.tokenIsValid = action.payload.isValid;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(actionValidateToken.pending, (state, _action) => {
        state.tokenIsValidating = true;
      })
      .addCase(actionValidateToken.fulfilled, (state, _action) => {
        state.tokenIsValidating = false;
        state.tokenIsValid = true;
      })
      .addCase(actionValidateToken.rejected, (state, _action) => {
        state.tokenIsValidating = false;
        state.tokenIsValid = false;
      }),
});

export const {setAlertData, clearAlertData, setUserToken} = sharedSlice.actions;

export const sharedReducer = sharedSlice.reducer;
