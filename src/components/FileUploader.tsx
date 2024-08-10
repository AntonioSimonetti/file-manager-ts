import React from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
  onUpload: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => onUpload(acceptedFiles),
  });

  return (
    <div {...getRootProps()} className="file-uploader">
      <input {...getInputProps()} />
      <p>Trascina qui i tuoi file, o clicca per selezionarli</p>
    </div>
  );
};

export default FileUploader;
