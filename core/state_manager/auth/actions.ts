import {createAsyncThunk} from '@reduxjs/toolkit';
import * as UserActions from './action.ids';
import {ISignupUser} from './interfaces';
import {CoreAPIService} from '../api/CoreAPI.service';

export const ActionSignupUser = createAsyncThunk(
  UserActions.IDActionSignupUser,
  async (arg: {userDetails: ISignupUser}, api) => {
    const {userDetails} = arg;
    const {rejectWithValue, dispatch} = api;
    try {
      const data = (await CoreAPIService.post('signup', {userDetails})).data;
      //   set the user token and the user profile here
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
