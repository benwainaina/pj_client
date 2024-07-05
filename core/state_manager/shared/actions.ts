import {createAsyncThunk} from '@reduxjs/toolkit';
import {IStore} from '../store';
import {selectUserTokenValue} from '../shared/selectors';
import {CoreAPIService} from '../api/CoreAPI.service';
import {IDActionValidateToken} from './action.id';
import {setUserProfile} from '../home/slice';

export const actionValidateToken = createAsyncThunk(
  IDActionValidateToken,
  async (arg, api) => {
    const {getState, rejectWithValue, dispatch} = api;
    const state = getState() as IStore;
    const token = selectUserTokenValue(state);

    try {
      const {data} = await CoreAPIService.post('user/validate_token', {
        token: token,
      });
      dispatch<any>(setUserProfile({userProfile: {username: data.username}}));
      return {data};
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
