import {createAsyncThunk} from '@reduxjs/toolkit';
import {IStore} from '../store';
import {selectUserTokenValue} from '../shared/selectors';
import {CoreAPIService} from '../api/CoreAPI.service';
import {IDActionValidateToken} from './action.id';

export const actionValidateToken = createAsyncThunk(
  IDActionValidateToken,
  async (arg, api) => {
    const {getState, rejectWithValue} = api;
    const state = getState() as IStore;
    const token = selectUserTokenValue(state);

    try {
      const {data} = await CoreAPIService.post('user/validate_token', {
        token: token,
      });
      return {data};
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
