export interface IEntry {
  /**
   * title for the entry
   */
  title: string;

  /**
   * content for the entry
   */
  content: string;

  /**
   * category to which the entry belongs, as an id
   */
  category: string;

  /**
   * entry id
   */
  uuid: string;

  /**
   * date the entry was added
   */
  date: string;

  /**
   * whether or not the category which may be new will be created
   */
  createCategory: boolean;
}

export interface IEntryCategory {
  /**
   * a label for the category, for example Personal
   */
  name: string;

  /**
   * the id of the category
   */
  uuid: string;
}

export interface IEntryFilters {
  [filterField: string]: any;
}

export interface IHomeState {
  /**
   * active filtes
   */
  filters: IEntryFilters;

  /**
   * list of entries
   */
  entries: Array<IEntry>;

  /**
   * the list of available category filters
   */
  entriesCategories: Array<IEntryCategory>;

  /**
   * status for fetching entries
   */
  isFetchingEntries: boolean;

  /**
   * whether an entry is being deleted
   */
  isDeletingEntry: boolean;

  /**
   * whether an entry is being created
   */
  isCreatingEntry: boolean;

  /**
   * whether an entry is being updated
   */
  isUpdatingEntry: boolean;

  /**
   * whether the user is updating their profile
   */
  isUpdatingProfile: boolean;

  /**
   * the overlay data
   */
  overlayData: IOverlayData;

  /**
   * user profile
   */
  userProfile?: IUserProfile;
}

export interface IUserProfile {
  /**
   * username
   */
  username: string;
}

export interface IUpdateProfileModel {
  username?: string;
  password?: string;
}

export interface IOverlayData {
  scope?: 'delete' | 'create' | 'edit' | 'updateProfile';
  payload?: any;
}

export const IHomeSliceKey = 'homeStateSlice';
