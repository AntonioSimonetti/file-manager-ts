import React from 'react';
import { DirectoryType } from '../types/fileTypes';

interface SidebarProps {
  directories: DirectoryType[];
  onDirectoryClick: (directory: DirectoryType) => void;
  selectedDirectory: DirectoryType | null;

}

const Sidebar: React.FC<SidebarProps> = ({ directories, onDirectoryClick ,selectedDirectory  }) => {
  console.log(directories); // Debug
  return (
    <div className="sidebar">
      {directories.map(directory => (
        <div 
          key={directory.id} 
          onClick={() => onDirectoryClick(directory)}
          className={`sidebar-item ${selectedDirectory?.id === directory.id ? 'selected' : ''}`}
        >
          📁 {directory.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
