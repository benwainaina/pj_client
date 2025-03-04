import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {Provider} from 'react-redux';
import {LoadingComponent} from './core/presentation/shared/components/LoadingComponent';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {Authenticator} from './core/presentation/shared/components/Authenticator';
import {STORE, STORE_PERSISTOR} from './core/state_manager/store';
import {AppRoutes} from './core/presentation/shared/routes';
import {AlertComponent} from './core/presentation/shared/components/AlertComponent';

function App(): React.JSX.Element {
  return (
    <React.StrictMode>
      <Provider store={STORE}>
        <PersistGate loading={<LoadingComponent />} persistor={STORE_PERSISTOR}>
          <NavigationContainer>
            <SafeAreaView style={STYLES.safeArea}>
              <StatusBar />
              <Authenticator>
                <AppRoutes />
              </Authenticator>
              <AlertComponent />
            </SafeAreaView>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

const STYLES = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
