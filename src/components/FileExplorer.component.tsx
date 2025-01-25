import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  RootState,
  createFolder,
  deleteFolder,
  duplicateFolder,
  moveFolder,
  renameFolder,
} from "../redux/reducer";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
`;


const ExploreHead = styled.h2`
  padding-left:16px;
  color:blue;
`;

const FileExplorerContainer = styled.div`
  position: relative;
  width: 100%;
  flex-grow : 1;
  // height: 100vh;
  background: #f7f9fc;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  box-sizing: border-box;
`;

const Folder = styled.div<{ dragging?: boolean }>`
  width: 100px;
  height: 100px;
  background: ${props => props.dragging ? '#b8c4d9' : '#e3e8f0'};
  border: 1px solid #d1d9e6;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  opacity: ${props => props.dragging ? 0.6 : 1};
  &:hover {
    background: #d1d9e6;
  }
`;

const FolderIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const ContextMenu = styled.div<{ x: number; y: number }>`
  position: fixed;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 8px 0;
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #f1f1f1;
  }
`;

const NewFolderInput = styled.input`
  position: absolute;
  width: 90px;
  padding: 4px;
  border: 1px solid #b8c4d9;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

interface FolderProps {
  id: string;
  name: string;
}

interface ContextMenuState {
  show: boolean;
  x: number;
  y: number;
  folderId?: string;
}

interface RenameInputState {
  show: boolean;
  folderId: string | null;
  folderName: string;
}

const FileExplorer = () => {
  const folders = useSelector((state: RootState) => state.folders.folders);
  const dispatch = useDispatch();

  const [draggingId, setDraggingId] = useState<string | null>(null);

  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    show: false,
    x: 0,
    y: 0,
  });

  const [newFolderInput, setNewFolderInput] = useState({
    show: false,
    x: 0,
    y: 0
  });

  const [renameInput, setRenameInput] = useState<RenameInputState>({
    show: false,
    folderId: null,
    folderName: ''
  });

  const handleCreateFolder = (e: React.MouseEvent) => {
    e.preventDefault();

    setNewFolderInput({
      show: true,
      x: e.clientX,
      y: e.clientY
    });
    setContextMenu({ show: false, x: 0, y: 0 });
  };

  const handleNewFolderKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && (e.target as HTMLInputElement).value.length > 0) {
      const folderName = (e.target as HTMLInputElement).value.trim();
      if (folderName) {
        dispatch(createFolder(folderName));
      }
      setNewFolderInput({ show: false, x: 0, y: 0 });
    } else if (e.key === 'Escape') {
      setNewFolderInput({ show: false, x: 0, y: 0 });
    }
  };

  const handleDeleteFolder = (id?: string) => {
    dispatch(deleteFolder(id ?? ''));
    setContextMenu({ show: false, x: 0, y: 0 });
  };

  const handleRenameFolder = (folderId?: string) => {
    const folder = folders.find(f => f.id === folderId);
    if (folder) {
      setRenameInput({
        show: true,
        folderId: folderId ?? "",
        folderName: folder.name
      });
      setContextMenu({ show: false, x: 0, y: 0 });
    }
  };

  const handleRenameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && (e.target as HTMLInputElement).value.length > 0) {
      const newName = (e.target as HTMLInputElement).value.trim();
      if (newName && renameInput.folderId) {
        dispatch(renameFolder({ id: renameInput.folderId, newName }));
      }
      setRenameInput({ show: false, folderId: null, folderName: '' });
    } else if (e.key === 'Escape') {
      setRenameInput({ show: false, folderId: null, folderName: '' });
    }
  };

  const handleDuplicateFolder = (id?: string) => {
    dispatch(duplicateFolder(id ?? ""));
    setContextMenu({ show: false, x: 0, y: 0 });
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

  const handleContextMenu = (e: React.MouseEvent, folderId?: string) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      folderId,
    });
  };

  useEffect(() => {
    const handleClick = () => {
      setContextMenu({ show: false, x: 0, y: 0 });
    };

    if (contextMenu.show) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [contextMenu.show]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('input')) {
        setNewFolderInput({ show: false, x: 0, y: 0 });
      }
    };

    if (newFolderInput.show) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [newFolderInput.show]);

  return (
    <Wrapper>
      <ExploreHead>Right click below to use create, rename, duplicate and delete a folder in the file explorer</ExploreHead>
      <FileExplorerContainer onContextMenu={(e: any) => handleContextMenu(e)}>
        {folders.map((folder: FolderProps) => (
          <Folder
            key={folder.id}
            draggable
            isDragging={draggingId === folder.id}
            onDragStart={() => handleDragStart(folder.id)}
            onDragOver={(e: React.DragEvent) => e.preventDefault()}
            onDrop={() => handleDrop(folder.id)}
            onContextMenu={(e: any) => {
              e.stopPropagation();
              handleContextMenu(e, folder.id);
            }}
          >
            <FolderIcon>📁</FolderIcon>
            {renameInput.show && renameInput.folderId === folder.id ? (
              <input
                autoFocus
                defaultValue={renameInput.folderName}
                onKeyDown={handleRenameKeyDown}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '90px',
                  padding: '4px',
                  border: '1px solid #b8c4d9',
                  borderRadius: '4px',
                  fontSize: '14px',
                  textAlign: 'center'
                }}
              />
            ) : (
              folder.name
            )}
          </Folder>
        ))}

        {contextMenu.show && (
          <ContextMenu x={contextMenu.x} y={contextMenu.y}>
            <MenuItem onClick={(e: any) => {
              e.stopPropagation();
              handleCreateFolder(e)
            }}>
              Create Folder
            </MenuItem>
            {contextMenu.folderId !== undefined && (
              <>
                <MenuItem onClick={() => handleRenameFolder(contextMenu.folderId)}>
                  Rename Folder
                </MenuItem>
                <MenuItem onClick={() => handleDuplicateFolder(contextMenu.folderId)}>
                  Duplicate Folder
                </MenuItem>
                <MenuItem onClick={() => handleDeleteFolder(contextMenu.folderId)}>
                  Delete Folder
                </MenuItem>
              </>
            )}
          </ContextMenu>
        )}

        {newFolderInput.show && (
          <NewFolderInput
            autoFocus
            placeholder="Folder name"
            onKeyDown={handleNewFolderKeyDown}
            style={{
              left: newFolderInput.x,
              top: newFolderInput.y
            }}
          />
        )}
      </FileExplorerContainer>
    </Wrapper>
  );
};

export default FileExplorer;