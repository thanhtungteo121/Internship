import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "./slide/userSlide";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
  // import { PersistGate } from 'redux-persist/integration/react'

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ["user"],
  }
  const rootReducer = combineReducers({
    user: userReducer,
  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)
// import cartReducer from './redux/cartReducers';
// import orderCreateReducer from './redux/orderReducers';
export const store = configureStore({
    reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)