export interface FileItemType {
    id: string;
    name: string;
    type: 'file' | 'folder';
    content?: string; 
  }
  
  export interface DirectoryType {
    id: string;
    name: string;
    type: 'folder';
    children: (FileItemType | DirectoryType)[]; 
  }
  