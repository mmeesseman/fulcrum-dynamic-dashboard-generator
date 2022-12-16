import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { storeReducer } from '../reducers/storeReducer'

export default () => {

  const persistConfig = {
    key: 'root',
    storage
  }

  const persistedReducer = persistReducer(persistConfig, storeReducer);

  const store = createStore(persistedReducer);
  const persistor = persistStore(store);

  return { store, persistor };
}