import React, { useState } from 'react';
import FileList from './components/FileList';
import FileUploader from './components/FileUploader';
import FileViewer from './components/FileViewer';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import { FileItemType, DirectoryType } from './types/fileTypes';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [files, setFiles] = useState<FileItemType[]>([]);
  const [directories, setDirectories] = useState<DirectoryType[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItemType | null>(null);
  const [currentDirectory, setCurrentDirectory] = useState<DirectoryType | null>(null);
  const [clickedDir, setClickedDir] =  useState<DirectoryType | null>(null);
  

  const handleFileClick = (file: FileItemType) => {
    if (file.type === 'file') {
      setSelectedFile(file);
      setClickedDir(null);
    }
  };

  const handleUpload = (uploadedFiles: File[]) => {
    console.log(files);
    const newFiles = uploadedFiles.map(file => ({
      id: uuidv4(),
      name: file.name,
      type: 'file' as 'file',
      content: '',
    }
  ));
    
    console.log("uploadedFiles", newFiles);

    if (currentDirectory) {
      const updatedCurrentDirectory = {
        ...currentDirectory,
        children: [...currentDirectory.children, ...newFiles],
      };
      setCurrentDirectory(updatedCurrentDirectory);
      setClickedDir(updatedCurrentDirectory)
      setDirectories(directories.map(dir =>
        dir.id === currentDirectory.id ? updatedCurrentDirectory : dir
      ));
    } else {
      setFiles([...files, ...newFiles]);
    }
  };

  const handleCreateFolder = (name: string) => {
    const newFolder: DirectoryType = {
      id: uuidv4(),
      name,
      type: 'folder',
      children: [],
    };
  
    console.log('Creating new folder:', newFolder);
  
    console.log("currentDir", currentDirectory);

      console.log('Directories before adding new folder:', directories);
      const updatedDirectories = [...directories, newFolder];
      console.log('Updated Directories:', updatedDirectories);
      setDirectories(updatedDirectories);
    
  };
  
  const handleDelete = () => {
    if (clickedDir) {
      const confirmDelete = window.confirm('Are you sure you want to delete this directory and all of its contents?');
      
      if (confirmDelete) {
        const updatedDirectories = directories.filter(directory => directory.id !== clickedDir.id);
        setDirectories(updatedDirectories);
  
        if (currentDirectory?.id === clickedDir.id) {
          setCurrentDirectory(null);
        }
  
        setClickedDir(null);
      }
  
    } else if (selectedFile) {
      if (currentDirectory) {
        const updatedChildren = currentDirectory.children.filter(item => item.id !== selectedFile.id);
  
        const updatedCurrentDirectory = {
          ...currentDirectory,
          children: updatedChildren,
        };
  
        console.log('Updated Current Directory:', updatedCurrentDirectory);
  
        const updatedDirectories = directories.map(dir =>
          dir.id === currentDirectory.id ? updatedCurrentDirectory : dir
        );
  
        console.log('Updated Directories:', updatedDirectories);
  
        setDirectories(updatedDirectories);
        setCurrentDirectory(updatedCurrentDirectory);
        setClickedDir(updatedCurrentDirectory);
      } 
  
      setSelectedFile(null);
    }
  };
  
  

  const handleDirectoryClick = (directory: DirectoryType) => {
    setCurrentDirectory(directory);
    setClickedDir(directory)
    setSelectedFile(null);
  };


  return (
    <div className="app-container">
      <Sidebar 
        directories={directories} 
        onDirectoryClick={handleDirectoryClick} 
        selectedDirectory={currentDirectory} 
        clickedDir={clickedDir}
      />
      <div className="main-content">
        <Toolbar 
          onCreateFolder={handleCreateFolder} 
          onDelete={handleDelete} 
        />
        <FileUploader 
          onUpload={handleUpload} 
          disabled={!currentDirectory} 
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
