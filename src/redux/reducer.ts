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
  name: "folders",
  initialState,
  reducers: {
    createFolder: (state, action: PayloadAction<string>) => {
      const newFolder = {
        id: Date.now().toString(),
        name: action.payload
      };
      state.folders.push(newFolder);
    },
    deleteFolder: (state, action: PayloadAction<string>) => {
      state.folders = state.folders.filter(
        (folder) => folder.id !== action.payload
      );
    },
    renameFolder: (state, action: PayloadAction<{ id: string; newName: string }>) => {
      const folder = state.folders.find(f => f.id === action.payload.id);
      if (folder) {
        folder.name = action.payload.newName;
      }
    },
    duplicateFolder: (state, action: PayloadAction<string>) => {
      const folder = state.folders.find(f => f.id === action.payload);
      if (folder) {
        const newFolder = {
          id: Date.now().toString(),
          name: `${folder.name} (copy)`
        };
        state.folders.push(newFolder);
      }
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

export const { createFolder, deleteFolder, renameFolder, duplicateFolder, moveFolder } = folderSlice.actions;

const store = configureStore({
  reducer: {
    folders: folderSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
