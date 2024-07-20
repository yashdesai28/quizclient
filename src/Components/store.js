// store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Import localStorage as the storage engine
import rootReducer from './reducers'; // your combined reducers

const persistConfig = {
  key: 'root',
  storage, // Set the storage engine to localStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
