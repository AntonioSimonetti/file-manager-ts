import React from 'react';

interface ToolbarProps {
  onCreateFolder: (name: string) => void;
  onDelete: (id: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onCreateFolder, onDelete }) => {
  const handleCreateFolder = () => {
    const folderName = prompt('Nome della nuova cartella:');
    if (folderName) {
      onCreateFolder(folderName);
    }
  };

  const handleDelete = () => {
    const itemId = prompt('ID del file o della cartella da eliminare:');
    if (itemId) {
      onDelete(itemId);
    }
  };

  return (
    <div className="toolbar">
      <button onClick={handleCreateFolder}>Crea Cartella</button>
      <button onClick={handleDelete}>Elimina</button>
    </div>
  );
};

export default Toolbar;
