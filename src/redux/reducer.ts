import { createSlice, PayloadAction, configureStore } from "@reduxjs/toolkit";

interface Folder {
  id: string;
  name: string;
}

interface FolderState {
  folders: Folder[];
}

const initialState: FolderState = {
  folders: [],
};

const folderSlice = createSlice({
  name: "ChatRoom",
  initialState,
  reducers: {
  },
});

export const {  } = folderSlice.actions;

const store = configureStore({
  reducer: {
    folders: folderSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
