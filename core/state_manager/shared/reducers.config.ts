/**
 * A configuration for the reducer, which will be passed onto the root
 * app reducer.
 *
 * This way, reducer configurations can be isolated from the rest of the
 * other reducer configurations
 */

import {persistReducer} from 'redux-persist';
import {ISharedSliceKey} from './interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sharedReducer} from './slice';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

export const sharedPersistReducer = persistReducer(
  {
    key: ISharedSliceKey,
    storage: AsyncStorage,
    whitelist: ['userToken'],
    stateReconciler: hardSet,
  },
  sharedReducer,
);
