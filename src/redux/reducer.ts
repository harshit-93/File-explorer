import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {};

const chatSlice = createSlice({
  name: "ChatRoom",
  initialState,
  reducers: {},
});

export const {} = chatSlice.actions;

const store = configureStore({
  reducer: {
    chats: chatSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
