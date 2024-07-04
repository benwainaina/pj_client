import {createSlice} from '@reduxjs/toolkit';
import {IAlertData, ISharedSliceKey, ISharedState} from './interfaces';

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
      state.alertData = {
        show: false,
        duration: 0,
        type: undefined,
        message: '',
      };
    },
    setUserToken(state, action: {payload: {userToken: string}}) {
      state.userToken = action.payload.userToken;
    },
  },
});

export const {setAlertData, clearAlertData, setUserToken} = sharedSlice.actions;

export const sharedReducer = sharedSlice.reducer;
