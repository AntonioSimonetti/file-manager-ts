export interface FileItemType {
    id: string;
    name: string;
    type: 'file' | 'folder';
    content?: string; 
  }
  
  export interface DirectoryType extends FileItemType {
    children?: FileItemType[]; 
  }
  