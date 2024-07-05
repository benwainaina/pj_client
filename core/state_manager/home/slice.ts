import {createSlice} from '@reduxjs/toolkit';
import {
  IHomeSliceKey,
  IHomeState,
  IOverlayData,
  IUserProfile,
} from './interfaces';
import {
  actionCreateUserEntry,
  actionUpdateProfile,
  deleteUserEntry,
  getEntryCategories,
  getUserEntries,
} from './actions';

const initialState: IHomeState = {
  filters: {},
  entries: [],
  entriesCategories: [],
  isFetchingEntries: false,
  overlayData: {},
  isCreatingEntry: false,
  isDeletingEntry: false,
  isUpdatingEntry: false,
};

const homeSlice = createSlice({
  name: IHomeSliceKey,
  initialState,
  reducers: {
    setOverlayData(state, action: {payload: {overlayData: IOverlayData}}) {
      state.overlayData = action.payload.overlayData;
    },
    clearOverlayData(state, action) {
      state.overlayData = {};
    },
    setUserProfile(state, action: {payload: {userProfile: IUserProfile}}) {
      state.userProfile = action.payload.userProfile;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getUserEntries.pending, (state, action) => {
        state.isFetchingEntries = true;
      })
      .addCase(getUserEntries.fulfilled, (state, action) => {
        state.entries = action.payload?.entries;
        state.isFetchingEntries = false;
      })
      .addCase(getUserEntries.rejected, (state, action) => {
        state.isFetchingEntries = false;
      })
      .addCase(getEntryCategories.fulfilled, (state, action) => {
        state.entriesCategories = action.payload?.categories;
      })
      .addCase(deleteUserEntry.pending, (state, action) => {
        state.isDeletingEntry = true;
      })
      .addCase(deleteUserEntry.fulfilled, (state, action) => {
        state.entries = state.entries.filter(
          entry => entry.uuid !== action.payload?.entryId,
        );
        state.isDeletingEntry = false;
      })
      .addCase(deleteUserEntry.rejected, (state, action) => {
        state.isDeletingEntry = false;
      })
      .addCase(actionCreateUserEntry.pending, (state, action) => {
        state.isCreatingEntry = true;
      })
      .addCase(actionCreateUserEntry.fulfilled, (state, action) => {
        state.isCreatingEntry = false;
        if (action.payload?.entry) {
          action.payload.entry.date = action.payload.entry.date.toString();
          state.entries = [...state.entries, action.payload?.entry];
        }
        if (action.payload?.category) {
          state.entriesCategories = [
            ...state.entriesCategories,
            action.payload?.category,
          ];
        }
      })
      .addCase(actionCreateUserEntry.rejected, (state, action) => {
        state.isCreatingEntry = false;
      })
      .addCase(actionUpdateProfile.pending, (state, action) => {
        state.isUpdatingProfile = true;
      })
      .addCase(actionUpdateProfile.fulfilled, (state, action) => {
        state.isUpdatingProfile = false;
      })
      .addCase(actionUpdateProfile.rejected, (state, action) => {
        state.isUpdatingProfile = false;
      }),
});

export const {setOverlayData, clearOverlayData, setUserProfile} =
  homeSlice.actions;

export const homeReducer = homeSlice.reducer;
