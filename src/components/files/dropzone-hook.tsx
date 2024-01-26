import { useDropzone } from 'react-dropzone';
import { useMutation } from '@tanstack/react-query';
import { postFile } from '@/api/axios-requests';
import { useToast } from '@/components/ui/use-toast';

export type uploadedFileType = {
  file_id: number;
  file: File;
  status: string;
  statusMessage?: string;
  uploadTimestamp: number;
};

export type DropzoneHookProps = {
  uploadedFiles: uploadedFileType[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<uploadedFileType[]>>;
  openModal: (file_id: string) => void;
  tab: string;
};

const generateRandomNumber = (): number => {
  return Math.floor(Math.random() * (9000000 - 1000000 + 1)) + 1000000;
};

/**
 * Custom hook for handling file uploads using a dropzone.
 *
 * This hook is designed to manage file uploads using a dropzone in a React component. It handles uploading files, updating their status, and provides essential information about the upload process.
 *
 * @returns {{
 *   getRootProps: Function,
 *   getInputProps: Function,
 *   isDragActive: boolean,
 *   isDragReject: boolean,
 *   isLoading: boolean,
 *   isError: boolean,
 *   fileRejections: Array<FileRejection>,
 *   uploadedFiles: Array<uploadedFileType>,
 *   updateFileStatus: Function,
 * }}
 * **/

const useFileDropzoneUpload = ({
  uploadedFiles,
  setUploadedFiles,
  openModal,
  tab,
}: DropzoneHookProps) => {
  const { toast } = useToast();
  const url = 'send/uploading';
  /**
   * Function to update the status of an uploaded file.
   *
   * @param {File} file - The uploaded file to update status for.
   * @param {string} status - The new status of the file (e.g., 'verwerkt' or 'geweigerd').
   * @param {string} statusMessage - An optional message explaining the status change.
   */
  const updateFileStatus = (file: File, status: string, statusMessage?: string) => {
    setUploadedFiles((prevUploadedFiles) =>
      prevUploadedFiles.map((uploadedFile) =>
        uploadedFile.file === file
          ? { ...uploadedFile, status, statusMessage, uploadTimestamp: Date.now() }
          : uploadedFile,
      ),
    );
  };
  /**
   * Function to upload a file and handle the response.
   *
   * @param {File} file - The file to upload.
   */

  const uploadFile = async (file: File) => {
    try {
      const response = await postFile(url, file, tab); // Pass the tab as an argument
      const message = (response as { message?: string }).message;
      updateFileStatus(file, 'verwerkt', message);
    } catch (error) {
      const message = (error as { message?: string }).message;
      updateFileStatus(file, 'geweigerd', message || 'Bestand niet geüpload naar server');
      console.error('error in useMutation: ', error);
    }
  };

  const { isLoading, isError, mutate } = useMutation(['uploadFile'], uploadFile);

  /**
   * Function to handle dropped or selected files.
   *
   * @param {File[]} acceptedFiles - An array of accepted files.
   */

  const onDropFunction = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const fileId = generateRandomNumber(); // Change the length as needed
    setUploadedFiles([
      ...uploadedFiles,
      { file, status: 'verwerken...', file_id: fileId, uploadTimestamp: Date.now() },
    ]);
    mutate(file);
  };
  // Use the useDropzone hook to manage file drop events
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    onDropAccepted: onDropFunction,
    onDropRejected: (rejectedFiles) => {
      toast({
        variant: 'destructive',
        title: 'Bestand niet geüpload',
        description: `Bestandstype wordt niet ondersteund voor bestand ${rejectedFiles[0].file.name}`,
        icon: 'mdi:alert-circle',
      });
    },
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1, // Allow only one file
  });

  // Return all the relevant information and functions
  return {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isLoading,
    isError,
    fileRejections,
    openModal,
  };
};

export default useFileDropzoneUpload;
