import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import DashboardGenerator from './components/DashboardGenerator';
import configureStore from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import './styles/styles.scss'

const { store, persistor } = configureStore();

// store.subscribe(() => {
//   console.log(store.getState())
// })

const jsx = (
  <Provider store={store} >
    <PersistGate loading={null} persistor={persistor} >
      <DashboardGenerator />
    </PersistGate>
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));
