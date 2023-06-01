import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/User';

export interface IUserStoreState {
  user: IUser | null;
}

const initialState: IUserStoreState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;