import React, { useState } from 'react';
import FileList from './components/FileList';
import FileUploader from './components/FileUploader';
import FileViewer from './components/FileViewer';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import { FileItemType, DirectoryType } from './types/fileTypes';

const initialFiles: FileItemType[] = [
  { id: '1', name: 'Document.txt', type: 'file', content: 'Contenuto del file di esempio' },
  { id: '2', name: 'Immagine.png', type: 'file', content: '' },
];

const initialDirectories: DirectoryType[] = [
  { id: '3', name: 'Cartella1', type: 'folder', children: [] },
  { id: '4', name: 'Cartella2', type: 'folder', children: [] },
];

const App: React.FC = () => {
  const [files, setFiles] = useState<FileItemType[]>(initialFiles);
  const [directories, setDirectories] = useState<DirectoryType[]>(initialDirectories);
  const [selectedFile, setSelectedFile] = useState<FileItemType | null>(null);
  const [selectedDirectory, setSelectedDirectory] = useState<DirectoryType | null>(null);

  const handleFileClick = (file: FileItemType) => {
    if (file.type === 'file') {
      setSelectedFile(file);
    }
  };

  const handleUpload = (uploadedFiles: File[]) => {
    const newFiles = uploadedFiles.map(file => ({
      id: (files.length + 1).toString(),
      name: file.name,
      type: 'file' as 'file',
      content: '', 
    }));
    setFiles([...files, ...newFiles]);
  };

  const handleCreateFolder = (name: string) => {
    console.log(`Creando cartella con nome: ${name}`); // Debug
    const newFolder: DirectoryType = {
      id: (directories.length + 1).toString(),
      name,
      type: 'folder',
      children: [],
    };
    setDirectories([...directories, newFolder]);
  };

  const handleDelete = () => {
    if (selectedFile) {
      setFiles(files.filter(file => file.id !== selectedFile.id));
      setSelectedFile(null);
    }
    if (selectedDirectory) {
      setDirectories(directories.filter(directory => directory.id !== selectedDirectory.id));
      setSelectedDirectory(null);
    }
  };

  const handleDirectoryClick = (directory: DirectoryType) => {
    setSelectedDirectory(directory);
    setSelectedFile(null); 
  };

  return (
    <div className="app-container">
      <Sidebar 
        directories={directories} 
        onDirectoryClick={handleDirectoryClick} 
        selectedDirectory={selectedDirectory} 
      />     
       <div className="main-content">
      <Toolbar onCreateFolder={handleCreateFolder} onDelete={handleDelete} />
      <FileUploader onUpload={handleUpload} />
        <FileList files={files} onFileClick={handleFileClick} />
        {selectedFile && <FileViewer file={selectedFile} />}
      </div>
    </div>
  );
};

export default App;
