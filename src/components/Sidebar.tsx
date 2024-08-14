import React from 'react';
import { DirectoryType } from '../types/fileTypes';

interface SidebarProps {
  directories: DirectoryType[];
  onDirectoryClick: (directory: DirectoryType) => void;
  selectedDirectory: DirectoryType | null;
  clickedDir: DirectoryType | null;

}

const Sidebar: React.FC<SidebarProps> = ({ directories, onDirectoryClick ,selectedDirectory, clickedDir  }) => {

 return (
    <div className="sidebar">
      {directories.map(directory => (
        <div 
          key={directory.id} 
          onClick={() => onDirectoryClick(directory)}
          className={`sidebar-item ${clickedDir?.id === directory.id ? 'selected' : ''}`}
        >
          📁 {directory.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
