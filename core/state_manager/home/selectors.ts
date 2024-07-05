import {createSelector} from '@reduxjs/toolkit';
import {IStore} from '../store';
import {IEntryCategory} from './interfaces';

const homeState = (state: IStore) => state.homeStateSlice;

/**
 * select is fetching entries
 */
export const selectIsFetchingEntries = createSelector(
  homeState,
  state => state?.isFetchingEntries,
);

/**
 * select the user entries
 */
export const selectUserEntries = createSelector(
  homeState,
  state => state?.entries,
);

/**
 * select entries filters
 */
export const selectEntriesFilters = createSelector(
  homeState,
  state => state?.filters,
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
