import React, { useState } from 'react';
import FileList from './components/FileList';
import FileUploader from './components/FileUploader';
import FileViewer from './components/FileViewer';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import { FileItemType, DirectoryType } from './types/fileTypes';

const App: React.FC = () => {
  const [files, setFiles] = useState<FileItemType[]>([]);
  const [directories, setDirectories] = useState<DirectoryType[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItemType | null>(null);
  const [currentDirectory, setCurrentDirectory] = useState<DirectoryType | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<DirectoryType[]>([]);

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
    
    if (currentDirectory) {
      const updatedCurrentDirectory = {
        ...currentDirectory,
        children: [...currentDirectory.children, ...newFiles],
      };
      setCurrentDirectory(updatedCurrentDirectory);
      setDirectories(directories.map(dir =>
        dir.id === currentDirectory.id ? updatedCurrentDirectory : dir
      ));
    } else {
      setFiles([...files, ...newFiles]);
    }
  };

  const handleCreateFolder = (name: string) => {
    const newFolder: DirectoryType = {
      id: (directories.length + 1).toString(),
      name,
      type: 'folder',
      children: [],
    };

    if (currentDirectory) {
      const updatedCurrentDirectory = {
        ...currentDirectory,
        children: [...currentDirectory.children, newFolder],
      };
      setCurrentDirectory(updatedCurrentDirectory);
      setDirectories(directories.map(dir =>
        dir.id === currentDirectory.id ? updatedCurrentDirectory : dir
      ));
    } else {
      setDirectories([...directories, newFolder]);
    }
  };

  const handleDelete = () => {
    if (selectedFile) {
      setFiles(files.filter(file => file.id !== selectedFile.id));
      setSelectedFile(null);
    }
    if (currentDirectory) {
      const updatedDirectories = directories.filter(directory => directory.id !== currentDirectory.id);
      setDirectories(updatedDirectories);
      setCurrentDirectory(null);
      setSelectedFile(null);
    }
  };

  const handleDirectoryClick = (directory: DirectoryType) => {
    if (currentDirectory) {
      setNavigationHistory([...navigationHistory, currentDirectory]);
    }
    setCurrentDirectory(directory);
    setSelectedFile(null);
  };

  const handleGoBack = () => {
    const previousDirectory = navigationHistory.pop();
    if (previousDirectory) {
      setCurrentDirectory(previousDirectory);
      setNavigationHistory([...navigationHistory]);
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        directories={directories} 
        onDirectoryClick={handleDirectoryClick} 
        selectedDirectory={currentDirectory} 
      />
      <div className="main-content">
        <Toolbar 
          onCreateFolder={handleCreateFolder} 
          onDelete={handleDelete} 
          onGoBack={handleGoBack} 
        />
        <FileUploader 
          onUpload={handleUpload} 
          disabled={!currentDirectory} // Disabilita il caricamento se `currentDirectory` è null
        />
        <FileList 
          files={currentDirectory ? currentDirectory.children.filter(item => item.type === 'file') as FileItemType[] : files} 
          onFileClick={handleFileClick} 
        />
        {selectedFile && <FileViewer file={selectedFile} />}
      </div>
    </div>
  );
};

export default App;
