import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserStoreState {
  key: string;
  location: string;
}

const initialState: IUserStoreState = {
  key: "index",
  location: "login"
};

export const userSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setMenuKey: (state, action: PayloadAction<string>) => {
      state.key = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    }
  },
});

export const { setMenuKey, setLocation } = userSlice.actions;
export default userSlice.reducer;