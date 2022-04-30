import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { AppContextProvider } from './components/DataStore/utils/appContext';
import React from 'react';

const AppWithContext = () => {
    return (
        <AppContextProvider>
            <App />
        </AppContextProvider>
    );
};
AppRegistry.registerComponent(appName, () => AppWithContext);
