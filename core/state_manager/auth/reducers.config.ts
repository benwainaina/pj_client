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
import {IAuthSliceKey} from './interfaces';
import {authReducer} from './slice';

export const authPersistReducer = persistReducer(
  {
    key: IAuthSliceKey,
    storage: AsyncStorage,
    whitelist: ['userToken'],
    stateReconciler: hardSet,
  },
  authReducer,
);
