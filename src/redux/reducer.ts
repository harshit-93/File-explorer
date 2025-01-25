import { createSlice, PayloadAction, configureStore } from "@reduxjs/toolkit";

interface Folder {
  id: string;
  name: string;
}

interface FolderState {
  folders: Folder[];
}

const initialState: FolderState = {
  folders: [
    {
      id: "1",
      name: "aa",
    },
    {
      id: "2",
      name: "bb",
    },
    {
      id: "3",
      name: "zz",
    },
  ],
};

let folderId = 1;

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    createFolder: (state, action: PayloadAction<string>) => {
      state.folders.push({ id: `${folderId++}`, name: action.payload });
    },
    deleteFolder: (state, action: PayloadAction<string>) => {
      state.folders = state.folders.filter(
        (folder) => folder.id !== action.payload
      );
    },
    moveFolder: (
      state,
      action: PayloadAction<{ draggingId: string; targetId: string }>
    ) => {
      const { draggingId, targetId } = action.payload;
      const folders = [...state.folders];
      const draggingIndex = folders.findIndex(
        (folder) => folder.id === draggingId
      );
      const targetIndex = folders.findIndex((folder) => folder.id === targetId);
      const [draggedFolder] = folders.splice(draggingIndex, 1);
      folders.splice(targetIndex, 0, draggedFolder);
      state.folders = folders;
    },
  },
});

export const { createFolder, deleteFolder, moveFolder } = folderSlice.actions;

const store = configureStore({
  reducer: {
    folders: folderSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
