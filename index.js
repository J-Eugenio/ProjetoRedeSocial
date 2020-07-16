import React from 'react'
import { Provider } from 'react-redux'
import {AppRegistry} from 'react-native'
import App from './src/App'
import {name as appName} from './app.json'
import {YellowBox} from 'react-native';
import storeConfig from './src/store/storeConfig'

import axios from 'axios'
axios.defaults.baseURL = 'https://lambe-fde43.firebaseio.com/'

YellowBox.ignoreWarnings(['Warning: ...']);
console.disableYellowBox = true;

const store = storeConfig()
const Redux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux)
