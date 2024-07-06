import {createSelector} from '@reduxjs/toolkit';
import {IStore} from '../store';

const homeState = (state: IStore) => state.homeStateSlice;

/**
 * select is fetching entries
 */
export const selectIsFetchingEntries = createSelector(
  homeState,
  state => state?.isFetchingEntries,
);

/**
 * select entries filters
 */
export const selectEntriesFilters = createSelector(
  homeState,
  state => state?.filters,
);

/**
 * select the user entries
 */
export const selectUserEntries = createSelector(
  homeState,
  selectEntriesFilters,
  (state, filters) => {
    let _entries = state?.entries || [];
    if (filters?.category && filters?.category !== 'all') {
      _entries = _entries.filter(entry => entry.category === filters.category);
    }
    return _entries;
  },
);

/**
 * select available filters categories
 */
export const selectEntriesCategories = createSelector(
  homeState,
  state => state.entriesCategories || [],
);

/**
 * select key-value formatted categories
 */
export const selectKVEntriesCategories = createSelector(
  selectEntriesCategories,
  categories => {
    const _categories: {[categoryId: string]: string} = {};
    categories
      .filter(category => category)
      .forEach(category => {
        _categories[category.uuid] = category.name;
      });
    return _categories;
  },
);

/**
 * get a category by id from the list of available categories
 *
 * TODO: keep or delete this in favor of above???
 */
export const selectCategoryFromAvailable = createSelector(
  selectEntriesCategories,
  categories => (categoryId: string) =>
    categories.find(category => category.uuid === categoryId),
);

/**
 * select the overlay data
 */
export const selectOverlayData = createSelector(
  homeState,
  state => state.overlayData,
);

/**
 * select entry
 */
export const selectEntryFromEntries = createSelector(
  selectUserEntries,
  entriesList => (entryId: string) =>
    entriesList.find(entry => entry.uuid === entryId),
);

/**
 * select is creating entry
 */
export const selectIsCreatingEntry = createSelector(
  homeState,
  state => state.isCreatingEntry,
);

/**
 * select user profile
 */
export const selectUserProfile = createSelector(
  homeState,
  state => state.userProfile,
);

/**
 * select whether the user is updating the profile
 */
export const selctUserIsUpdatingProfile = createSelector(
  homeState,
  state => state.isUpdatingProfile,
);
