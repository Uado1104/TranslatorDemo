import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { createMigrate, persistReducer, persistStore } from 'redux-persist';
import testReducer from '../features/tests/testSlice';
import { apiErrorHandlingMiddleware } from './middleware';

const reducerConfig = {
  test: testReducer,
} as const;

const rootReducer = combineReducers(reducerConfig);

const whitelist: (keyof typeof reducerConfig)[] = ['test'];

const VERSON = 4;

const persistedReducer = persistReducer(
  {
    version: VERSON,
    key: 'root',
    storage,
    whitelist,
    migrate: createMigrate({
      [VERSON]: () => {
        // 升级版本时，如果需要迁移数据，就在这里写，返回undefined表示重置数据
        return undefined;
      },
    }),
  },
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,

  // serializableCheck: false是为了解决redux-persist中检查action时的报错
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([apiErrorHandlingMiddleware]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
