import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './contacts/contacts-reducer';
import authReducer from './auth/auth-reduser';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];

const authPersistConfig = {
  key: 'token',
  storage,
  whitelist: ['token']
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  contacts: contactsReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };