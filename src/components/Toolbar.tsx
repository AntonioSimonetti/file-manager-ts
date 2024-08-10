import React from 'react';

interface ToolbarProps {
  onCreateFolder: (name: string) => void;
  onDelete: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onCreateFolder, onDelete }) => {
  const handleCreateFolder = () => {
    const folderName = prompt('Nome della nuova cartella:');
    console.log("foldername", folderName)
    if (folderName) {
      onCreateFolder(folderName);
    }
  };



  return (
    <div className="toolbar">
      <button onClick={handleCreateFolder}>Crea Cartella</button>
      <button onClick={onDelete}>Elimina</button>
    </div>
  );
};

export default Toolbar;
