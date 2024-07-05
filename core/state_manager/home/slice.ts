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
  actionUpdateUserEntry,
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
  isUpdatingProfile: false,
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
    editFilterField(
      state,
      action: {payload: {filterField: string; filterFieldValue: any}},
    ) {
      if (!state.filters) {
        state.filters = {};
      }
      const {filterField, filterFieldValue} = action.payload;
      state.filters[filterField] = filterFieldValue;
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
      .addCase(actionUpdateUserEntry.pending, (state, action) => {
        state.isUpdatingEntry = true;
      })
      .addCase(actionUpdateUserEntry.fulfilled, (state, action) => {
        if (action.payload?.entry) {
          state.entries = state.entries.map(storedEntry => {
            if (storedEntry.uuid === action.payload?.entry.uuid) {
              storedEntry.category = action.payload.category
                ? action.payload.category.uuid
                : action.payload.entry.category;
              storedEntry.title = action.payload.entry.title;
              storedEntry.content = action.payload.entry.content;
              storedEntry.date = action.payload.entry.date;
            }
            return storedEntry;
          });
        }
        if (action.payload?.category) {
          state.entriesCategories = [
            ...state.entriesCategories,
            action.payload?.category,
          ];
        }
        state.isUpdatingEntry = false;
      })
      .addCase(actionUpdateUserEntry.rejected, (state, action) => {
        state.isUpdatingEntry = false;
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

export const {
  setOverlayData,
  clearOverlayData,
  setUserProfile,
  editFilterField,
} = homeSlice.actions;

export const homeReducer = homeSlice.reducer;
