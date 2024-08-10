import React from 'react';
import { FileItemType } from '../types/fileTypes';

interface FileItemProps {
  file: FileItemType;
  onClick: () => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, onClick }) => {
  return (
    <div onClick={onClick} className="file-item">
      {file.type === 'folder' ? '📁' : '📄'} {file.name}
    </div>
  );
};

export default FileItem;
