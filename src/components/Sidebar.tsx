import React from 'react';
import { DirectoryType } from '../types/fileTypes';

interface SidebarProps {
  directories: DirectoryType[];
  onDirectoryClick: (directory: DirectoryType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ directories, onDirectoryClick }) => {
  return (
    <div className="sidebar">
      {directories.map(directory => (
        <div 
          key={directory.id} 
          onClick={() => onDirectoryClick(directory)}
          className="sidebar-item"
        >
          📁 {directory.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
