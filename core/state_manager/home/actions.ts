import {createAsyncThunk} from '@reduxjs/toolkit';
import {IDActionValidateToken} from './action.ids';
import {IStore} from '../store';
import {selectUserTokenValue} from '../shared/selectors';
import {CoreAPIService} from '../api/CoreAPI.service';

export const actionValidateToken = createAsyncThunk(
  IDActionValidateToken,
  async (arg, api) => {
    const {getState, rejectWithValue} = api;
    const state = getState() as IStore;
    const token = selectUserTokenValue(state);

    try {
      const {data} = await CoreAPIService.post('validate', {token});
      console.log('data', data);
      return {data};
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
