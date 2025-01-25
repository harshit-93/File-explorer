import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  RootState,
  createFolder,
  deleteFolder,
  moveFolder,
} from "../redux/reducer";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const FileExplorerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: #f7f9fc;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  box-sizing: border-box;
`;

const Folder = styled.div`
  width: 100px;
  height: 100px;
  background: #e3e8f0;
  border: 1px solid #d1d9e6;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  &:hover {
    background: #d1d9e6;
  }
`;

const StyledContextMenu = styled(ContextMenu)`
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 8px 0;
  z-index: 1000;
`;

const StyledMenuItem = styled(MenuItem)`
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #f1f1f1;
  }
`;

interface FolderProps {
  id: string;
  name: string;
}

const FileExplorer = () => {
  const folders = useSelector((state: RootState) => state.folders.folders);
  const dispatch = useDispatch();

  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleCreateFolder = () => {
    const folderName = prompt("Enter folder name:");
    if (folderName) {
      dispatch(createFolder(folderName));
    }
  };

  const handleDeleteFolder = (id: string) => {
    dispatch(deleteFolder(id));
  };

  const handleDragStart = (id: string) => {
    setDraggingId(id);
  };

  const handleDrop = (id: string) => {
    if (draggingId && draggingId !== id) {
      dispatch(moveFolder({ draggingId: draggingId, targetId: id }));
    }
    setDraggingId(null);
  };

  console.log(folders);

  return (
    <FileExplorerContainer>
      {folders.map((folder: FolderProps) => (
        <ContextMenuTrigger id={`contextmenu-${folder.id}`} key={folder.id}>
          <Folder
            draggable
            onDragStart={() => handleDragStart(folder.id)}
            onDragOver={(e: any) => e.preventDefault()}
            onDrop={() => handleDrop(folder.id)}
          >
            {folder.name}
          </Folder>
          <StyledContextMenu id={`contextmenu-${folder.id}`}>
            <StyledMenuItem onClick={handleCreateFolder}>
              Create Folder
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleDeleteFolder(folder.id)}>
              Delete Folder
            </StyledMenuItem>
          </StyledContextMenu>
        </ContextMenuTrigger>
      ))}
    </FileExplorerContainer>
  );
};

export default FileExplorer;
