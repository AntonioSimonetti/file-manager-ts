// Tipo base per rappresentare un file o una cartella
export interface FileItemType {
    id: string;
    name: string;
    type: 'file' | 'folder';
    content?: string; // Solo i file avranno contenuto, le cartelle no
  }
  
  // Tipo per rappresentare una directory che può contenere altri file e cartelle
  export interface DirectoryType extends FileItemType {
    children?: FileItemType[]; // Le directory possono avere figli
  }
  