import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import navReducer from './reducers/navigation';

export const store = configureStore({
  reducer: {
    user: userReducer,
    navigation: navReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;