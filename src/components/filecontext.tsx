import React, { createContext, useContext, useState, ReactNode } from 'react';
import { uploadedFileType } from './files/dropzone-hook';

// So the files you uplaod in the file upload dropzone can still be seen even if you switch pages
type FileContextType = {
  uploadedFiles: uploadedFileType[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<uploadedFileType[]>>;
};

const FileContext = createContext<FileContextType | undefined>(undefined);

type FileContextProviderProps = {
  children: ReactNode;
};

export const FileContextProvider: React.FC<FileContextProviderProps> = ({ children }) => {
  const [uploadedFiles, setUploadedFiles] = useState<uploadedFileType[]>([]);

  return (
    <FileContext.Provider value={{ uploadedFiles, setUploadedFiles }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFileContext must be used within a FileContextProvider');
  }
  return context;
};
