/**
 * A configuration for the reducer, which will be passed onto the root
 * app reducer.
 *
 * This way, reducer configurations can be isolated from the rest of the
 * other reducer configurations
 */

import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import {IHomeSliceKey} from './interfaces';
import {homeReducer} from './slice';

export const homePersistReducer = persistReducer(
  {
    key: IHomeSliceKey,
    storage: AsyncStorage,
    whitelist: [''],
    stateReconciler: hardSet,
  },
  homeReducer,
);
