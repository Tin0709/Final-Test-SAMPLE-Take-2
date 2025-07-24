import { configureStore, createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {},
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      state[id] = !state[id];
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
  },
});

export default store;
