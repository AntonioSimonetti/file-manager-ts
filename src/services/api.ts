// src/services/api.ts

import axios, { AxiosResponse } from 'axios';
import { FileItemType } from '../types/fileTypes';

// URL base per l'API, modifica questo URL con quello reale del tuo backend
const API_URL = 'https://api.example.com';

// Funzione per recuperare i file in una directory specifica
export const fetchFiles = async (directoryId: string | null): Promise<FileItemType[]> => {
  const response: AxiosResponse<FileItemType[]> = await axios.get(`${API_URL}/files`, { params: { directoryId } });
  return response.data;
};

// Funzione per caricare un file
export const uploadFile = async (file: File): Promise<FileItemType> => {
  const formData = new FormData();
  formData.append('file', file);
  const response: AxiosResponse<FileItemType> = await axios.post(`${API_URL}/upload`, formData);
  return response.data;
};

// Funzione per creare una nuova cartella
export const createFolder = async (name: string, parentId: string | null): Promise<FileItemType> => {
  const response: AxiosResponse<FileItemType> = await axios.post(`${API_URL}/folders`, { name, parentId });
  return response.data;
};

// Funzione per eliminare un file o una cartella
export const deleteFileOrFolder = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/files/${id}`);
};

// Altri metodi API come renameFile, moveFile, ecc. possono essere aggiunti qui
