import {createSlice} from '@reduxjs/toolkit';
import {IHomeSliceKey, IHomeState, IOverlayData} from './interfaces';
import {deleteUserEntry, getEntryCategories, getUserEntries} from './actions';

const initialState: IHomeState = {
  filters: {},
  entries: [],
  entriesCategories: [],
  isFetchingEntries: false,
  overlayData: {},
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
      }),
});

export const {setOverlayData, clearOverlayData} = homeSlice.actions;

export const homeReducer = homeSlice.reducer;
