import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {Provider} from 'react-redux';
import {LoadingComponent} from './core/presentation/shared/LoadingComponent';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {Authenticator} from './core/presentation/shared/Authenticator';
import {STORE, STORE_PERSISTOR} from './core/state_manager/store';
import {AppRoutes} from './core/presentation/shared/routes';

function App(): React.JSX.Element {
  return (
    <React.StrictMode>
      <Provider store={STORE}>
        <PersistGate loading={<LoadingComponent />} persistor={STORE_PERSISTOR}>
          <NavigationContainer>
            <SafeAreaView style={{flex: 1}}>
              <StatusBar></StatusBar>
              <Authenticator>
                <AppRoutes></AppRoutes>
              </Authenticator>
            </SafeAreaView>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
