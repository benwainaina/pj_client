import {createAsyncThunk} from '@reduxjs/toolkit';
import * as UserActions from './action.ids';
import {ISignupUser} from './interfaces';
import {CoreAPIService} from '../api/CoreAPI.service';
import {setAlertData} from '../shared/slice';

export const actionSignupUser = createAsyncThunk(
  UserActions.IDActionSignupUser,
  async (arg: {userDetails: ISignupUser}, api) => {
    const {userDetails} = arg;
    const {rejectWithValue, dispatch} = api;
    try {
      const data = (await CoreAPIService.post('user/signup', {...userDetails}))
        .data;
      dispatch(
        setAlertData({
          type: 'success',
          message: 'Your journaling journey begins now!',
          duration: 1000,
        }),
      );
      return data;
    } catch (error: any) {
      dispatch(
        setAlertData({
          type: 'error',
          message: 'An error occured!',
          duration: 1000,
        }),
      );
      return rejectWithValue(error.message);
    }
  },
);
