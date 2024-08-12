import React from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
  onUpload: (files: File[]) => void;
  disabled: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload, disabled }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => onUpload(acceptedFiles),
    disabled,
  });

  return (
    <div {...getRootProps()} className={`file-uploader ${disabled ? 'disabled' : ''}`}>
      <input {...getInputProps()} />
      <p>Trascina qui i tuoi file, o clicca per selezionarli</p>
    </div>
  );
};

export default FileUploader;
