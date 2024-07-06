import {createAsyncThunk} from '@reduxjs/toolkit';
import * as UserActionIDs from './action.ids';
import {IStore} from '../store';
import {selectUserTokenValue} from '../shared/selectors';
import {CoreAPIService} from '../api/CoreAPI.service';
import {IEntry, IEntryFilters} from './interfaces';
import {setAlertData, setUserToken} from '../shared/slice';
import {IAlertData} from '../shared/interfaces';
import {clearOverlayData, setUserProfile} from './slice';
import {dismissKeyboardUtility} from '../../presentation/shared/utilities/keyboard.utility';
import {datePeriodFormatterUtility} from '../../presentation/shared/utilities/datePeriodFormatter.utility';
import {shallowCopyUtility} from '../../presentation/shared/utilities/shallowCopy.utility';
import {IDynamicObject} from '../../presentation/shared/interfaces';

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
    const {rejectWithValue, dispatch, getState} = api;
    const userToken = selectUserTokenValue(getState() as IStore);

    try {
      const {data} = await CoreAPIService.post('entry/create_entry', {
        token: userToken,
        ...entry,
      });
      commonAlertDispatch(
        {
          type: 'success',
          message: 'Your entry has been added!',
          duration: 2000,
        },
        dispatch,
      );
      dismissKeyboardUtility();
      dispatch<any>(clearOverlayData({}));
      dispatch<any>(getUserEntries({filters: {}}));
      if (entry.createCategory) {
        entry.category = data.category.uuid;
      }
      return {
        entry: {...entry, uuid: data.entry_uuid},
        category: entry.createCategory ? data.category : null,
      };
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

export const actionUpdateUserEntry = createAsyncThunk(
  UserActionIDs.IDActionUpdateEntry,
  async (arg: {entry: IEntry}, api) => {
    const {entry} = arg;
    const {rejectWithValue, dispatch, getState} = api;
    const userToken = selectUserTokenValue(getState() as IStore);

    try {
      entry.date = new Date(entry.date) as any;
      const {data} = await CoreAPIService.post('entry/update_entry', {
        token: userToken,
        ...entry,
      });
      commonAlertDispatch(
        {
          type: 'success',
          message: 'Your entry has been updated!',
          duration: 2000,
        },
        dispatch,
      );
      dismissKeyboardUtility();
      dispatch<any>(clearOverlayData({}));
      dispatch<any>(getUserEntries({filters: {}}));
      entry.date = entry.date.toString();
      return {entry, category: entry.createCategory ? data.category : null};
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
      let _filters: IDynamicObject = {};
      if (filters) {
        _filters = shallowCopyUtility(filters);
      }
      if (_filters.period) {
        if (_filters.period !== 'all') {
          _filters.period = datePeriodFormatterUtility(_filters.period);
        }
      }
      const {data} = await CoreAPIService.post('entry/filter', {
        token: userToken,
        filter_fields: _filters,
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
      await CoreAPIService.post('entry/delete', {
        token: userToken,
        uuid: entryId,
      });
      dispatch<any>(clearOverlayData({}));
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

export const actionUpdateProfile = createAsyncThunk(
  UserActionIDs.IDActionUpdateProfile,
  async (arg: {payload: IDynamicObject}, api) => {
    const {payload} = arg;
    const {rejectWithValue, dispatch, getState} = api;
    const userToken = selectUserTokenValue(getState() as IStore);

    try {
      await CoreAPIService.post('user/update_profile', {
        token: userToken,
        ...payload,
      });
      dispatch<any>(clearOverlayData({}));
      if (payload.username) {
        dispatch<any>(
          setUserProfile({userProfile: {username: payload.username}}),
        );
      }
      if (payload.newPassword) {
        dispatch<any>(setUserToken({userToken: '', isValid: false}));
      }
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
