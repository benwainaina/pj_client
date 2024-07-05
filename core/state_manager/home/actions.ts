import {createAsyncThunk} from '@reduxjs/toolkit';
import * as UserActionIDs from './action.ids';
import {IStore} from '../store';
import {selectUserTokenValue} from '../shared/selectors';
import {CoreAPIService} from '../api/CoreAPI.service';
import {IEntry, IEntryFilters} from './interfaces';
import {setAlertData} from '../shared/slice';
import {IAlertData} from '../shared/interfaces';
import {clearOverlayData} from './slice';

export const getEntryCategories = createAsyncThunk(
  UserActionIDs.IDActionGetEntryCategories,
  async (arg, api) => {
    const {rejectWithValue, dispatch, getState} = api;
    const userToken = selectUserTokenValue(getState() as IStore);

    try {
      const {data} = await CoreAPIService.post('entry/available_categories', {
        token: userToken,
      });
      return {categories: data.categories};
    } catch (error: any) {
      commonAlertDispatch(
        {
          type: 'error',
          message: 'An error occured!',
          duration: 2000,
        },
        dispatch,
      );
      rejectWithValue(error.error);
    }
  },
);

export const actionCreateUserEntry = createAsyncThunk(
  UserActionIDs.IDActionCreateEntry,
  async (arg: {entry: IEntry}, api) => {
    const {entry} = arg;
    const {rejectWithValue, dispatch} = api;

    try {
      commonAlertDispatch(
        {
          type: 'success',
          message: 'Your entry has been added!',
          duration: 1000,
        },
        dispatch,
      );
    } catch (error: any) {
      commonAlertDispatch(
        {
          type: 'error',
          message: 'An error occured!',
          duration: 2000,
        },
        dispatch,
      );
      rejectWithValue(error.error);
    }
  },
);

export const getUserEntries = createAsyncThunk(
  UserActionIDs.IDActionGetEntries,
  async (arg: {filters: IEntryFilters}, api) => {
    const {filters} = arg;
    const {rejectWithValue, dispatch, getState} = api;
    const userToken = selectUserTokenValue(getState() as IStore);

    try {
      const {data} = await CoreAPIService.post('entry/filter', {
        token: userToken,
        filter_fields: filters,
      });
      return {entries: data.data};
    } catch (error: any) {
      commonAlertDispatch(
        {
          type: 'error',
          message: 'An error occured!',
          duration: 2000,
        },
        dispatch,
      );
      rejectWithValue(error.error);
    }
  },
);

export const deleteUserEntry = createAsyncThunk(
  UserActionIDs.IDActionDeleteEntry,
  async (arg: {entryId: string}, api) => {
    const {entryId} = arg;
    const {rejectWithValue, dispatch, getState} = api;
    const userToken = selectUserTokenValue(getState() as IStore);

    try {
      const {data} = await CoreAPIService.post('entry/delete', {
        token: userToken,
        uuid: entryId,
      });
      dispatch<any>(clearOverlayData());
      return {entryId};
    } catch (error: any) {
      commonAlertDispatch(
        {
          type: 'error',
          message: 'An error occured!',
          duration: 2000,
        },
        dispatch,
      );
      rejectWithValue(error.error);
    }
  },
);

const commonAlertDispatch = (payload: IAlertData, dispatch: any) => {
  dispatch(setAlertData(payload));
};
