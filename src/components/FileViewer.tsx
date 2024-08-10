import React from 'react';
import { FileItemType } from '../types/fileTypes';

interface FileViewerProps {
  file: FileItemType;
}

const FileViewer: React.FC<FileViewerProps> = ({ file }) => {
  if (file.type === 'folder') {
    return <div>Apri questa cartella per visualizzare il contenuto</div>;
  }
  return (
    <div>
      <h3>{file.name}</h3>
      <pre>{file.content}</pre>
    </div>
  );
};

export default FileViewer;
