/**
 * This is the main entry point for the state manager
 */

import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {ISharedSliceKey, ISharedState} from './shared/interfaces';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {sharedPersistReducer} from './shared/reducers.config';
import {IAuthSliceKey, IAuthState} from './auth/interfaces';
import {authPersistReducer} from './auth/reducers.config';

export interface IStore {
  [ISharedSliceKey]: ISharedState;
  [IAuthSliceKey]: IAuthState;
}

export let STORE = configureStore({
  /**
   * The root reducer for the application, which will be hooked into
   * redux persist using persistReducer
   */
  reducer: persistReducer(
    {
      key: 'root',

      /**
       * This is needed because it is a react native project, so we will
       * user async storage to store "localstorage" contents
       */
      storage: AsyncStorage,
    },
    /**
     * All the reducers for the application will be added here,
     * with their persit configurations defined
     */
    combineReducers({
      [ISharedSliceKey]: sharedPersistReducer,
      [IAuthSliceKey]: authPersistReducer,
    }),
  ),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        /**
         * We need to disable the below actions as per the guideling from
         * redux-toolkit usage with redux-persis
         *
         * https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
         */
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      thunk: {
        extraArgument: {},
      },
    }),
});

export let STORE_PERSISTOR = persistStore(STORE);
