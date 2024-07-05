import {createAsyncThunk} from '@reduxjs/toolkit';
import * as UserActions from './action.ids';
import {ISignupUser, IUserCredentails} from './interfaces';
import {CoreAPIService} from '../api/CoreAPI.service';
import {setAlertData, setUserToken} from '../shared/slice';
import {setUserProfile} from '../home/slice';

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
          message:
            'Your journaling journey begins now! You can proceed to login.',
          duration: 2000,
        }),
      );
      return data;
    } catch (error: any) {
      dispatch(
        setAlertData({
          type: 'error',
          message: 'An error occured!',
          duration: 5000,
        }),
      );
      return rejectWithValue(error.message);
    }
  },
);

export const actionLoginUser = createAsyncThunk(
  UserActions.IDActionLoginUser,
  async (arg: {userCredentials: IUserCredentails}, api) => {
    const {userCredentials} = arg;
    const {rejectWithValue, dispatch} = api;
    try {
      const data = (
        await CoreAPIService.post('user/login', {...userCredentials})
      ).data;
      dispatch<any>(setUserToken({userToken: data.token}));
      dispatch<any>(setUserProfile({userProfile: {username: data.username}}));
    } catch (error: any) {
      dispatch(
        setAlertData({
          type: 'error',
          message: 'An error occured!',
          duration: 5000,
        }),
      );
      return rejectWithValue(error.message);
    }
  },
);
