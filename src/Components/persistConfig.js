// persistConfig.js
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    // You can also configure blacklist/whitelist, transforms, and other options here
};

export default persistConfig;
