import useFileDropzoneUpload, { DropzoneHookProps } from './dropzone-hook';
import { Flex, Text } from '@radix-ui/themes';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';
import { useFileContext } from '../filecontext';

type DropzoneComponentProps = DropzoneHookProps & {
  openModal: (file_id: string) => void;
};

/**
 * A component to upload files using react-dropzone and react-query.
 * @component
 * @returns {React.ReactElement}
 * @example
 * return (
 *  <DropzoneComponent />
 * )
 **/
export function DropzoneComponent({ openModal, tab }: DropzoneComponentProps) {
  const { uploadedFiles, setUploadedFiles } = useFileContext();
  const { getRootProps, getInputProps, isDragActive, isDragReject, isLoading, isError } =
    useFileDropzoneUpload({ uploadedFiles, setUploadedFiles, openModal, tab });

  return (
    <Flex
      direction='column'
      gap={'2'}
      my={'2'}
      justify='center'
      align='center'
      className={`hover:cursor-pointer hover:opacity-70 h-60 mx-auto w-100 rounded-md bordertext-sm border ${
        isDragActive
          ? 'border-primary border-solid border-2 text-primary bg-secondary opacity-70 font-semibold'
          : 'border-dashed bg-light border-muted-foreground'
      } ${isDragReject || isError ? 'text-error-main border-error-light bg-error-lighter' : ''} ${
        isLoading ? 'bg-muted text-muted-foreground' : ''
      }`}
      {...getRootProps()}
    >
      <Icon
        icon={isDragActive ? 'ri:drag-drop-line' : isLoading ? 'mdi:loading' : 'mdi:tray-arrow-up'}
        width='30'
        className={`mb-3 mr-2 ${isLoading ? 'animate-spin' : ''}`}
      />
      <input {...getInputProps()} />
      <Flex direction='column' align='center'>
        <Text as='div' align='center'>
          {isDragActive
            ? 'Bestand hier plaatsen'
            : isLoading
            ? `Bestand aan het uploaden voor ${tab}`
            : `Sleep bestand hiernaartoe voor ${tab}`}
        </Text>
        <Text as='div' className={cn(buttonVariants({ variant: 'link' })) + 'text-center'}>
          {isDragActive || isLoading ? ' ' : 'of klik om te zoeken'}
        </Text>
      </Flex>
    </Flex>
  );
}
