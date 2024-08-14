import React from 'react';
import { FileItemType } from '../types/fileTypes';
import FileItem from './FileItem';

interface FileListProps {
  files: FileItemType[];
  onFileClick: (file: FileItemType) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onFileClick }) => {

  return (
    <div>
      {files.map(file => (
        <FileItem 
          key={file.id} 
          file={file} 
          onClick={() => onFileClick(file)} 
        />
      ))}
    </div>
  );
};

export default FileList;
