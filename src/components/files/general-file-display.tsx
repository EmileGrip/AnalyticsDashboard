import { Icon } from '@iconify/react';
import { Heading, Badge, Tooltip, Text, Grid } from '@radix-ui/themes';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from '@radix-ui/react-icons';
import { formatDutchDate } from '@/lib/date-formats';
import React, { useState } from 'react';

type FileTypeDefinition = {
  icon: string;
  color: string;
};

type StatusInfo = {
  color: 'gray' | 'green' | 'red' | 'orange';
  helperText: string;
  icon: string;
  tooltipText: string;
};

type FileItem = {
  filename?: string;
  last_modified?: number;
  status?: string;
  statusMessage?: string;
  uploadTimestamp?: number;
  file_id?: string;
  size?: number;
};

type FileDisplayProps = {
  fileData: FileItem[];
  onDownloadClick?: () => void;
  openModal?: (file_id: string) => void;
};

const fileTypes: Record<string, FileTypeDefinition> = {
  csv: { icon: 'iwwa:file-csv', color: 'green' },
  pdf: { icon: 'iwwa:file-pdf', color: 'red' },
  xlsx: { icon: 'iwwa:file-xsl', color: 'green' },
  default: { icon: 'iwwa:file', color: 'gray' },
};

const statusInfo: Record<string, StatusInfo> = {
  'verwerken...': {
    color: 'orange',
    helperText: 'In Progress',
    icon: 'in-progress-icon',
    tooltipText: 'Bestand wordt geupload naar de server',
  },
  verwerkt: {
    color: 'green',
    helperText: 'Processed',
    icon: 'processed-icon',
    tooltipText: 'Bestand is succesvol geupload',
  },
  geweigerd: {
    color: 'red',
    helperText: 'Niet verwerkt',
    icon: 'rejected-icon',
    tooltipText: 'Let op: Bestand is niet verwerkt',
  },
  default: {
    color: 'gray',
    helperText: 'Unknown Status',
    icon: 'unknown-icon',
    tooltipText: 'File status is unknown',
  },
};

const getFileExtension = (fileName: string): string => fileName.split('.').pop() || 'default';

function formatFileSize(size: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return size.toFixed(Math.min(unitIndex, 1)) + ' ' + units[unitIndex];
}


const FileDisplay: React.FC<FileDisplayProps> = ({ fileData, onDownloadClick, openModal }) => {
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'download'>('idle');

  // Function to check if statusMessage includes any specified codes
  const statusMessageIncludes = (message: string): string => {
    const statusCodes: Record<number, string> = {
      422: "Let op: niet de juiste bestandsnaam, moet FL01 of FL02 bevatten, afhankelijk van in welk tabblad je het probeert te uploaden.",
      400: "Let op: niet-ondersteund bestandsformaat, alleen csv-bestanden zijn toegestaan.",
      500: "Let op: er is een interne serverfout opgetreden, probeer het nog eens."
    };

    for (const code in statusCodes) {
      if (message.includes(code)) {
        return statusCodes[code];
      }
    }

    return message
  };


  return (
    <div>
      {fileData.map((fileItem, index) => {
        const {
          filename,
          last_modified,
          size,
          status,
          statusMessage,
          uploadTimestamp,
          file_id,
        } = fileItem;
        const formattedDate =
          (last_modified ? formatDutchDate(last_modified) : null) ||
          (uploadTimestamp ? formatDutchDate(uploadTimestamp) : { formattedDate: '', formattedTime: '' });
        const fileNameToUse = filename || 'Default Filename';
        const fileExtensionColor =
          fileTypes[getFileExtension(fileNameToUse)].color;
        const isClickable = status === 'geweigerd';

        return (
          <div
            key={index}
            className={`hover:border-primary my-2 mb-2 rounded-lg border p-4 gap-0 ${isClickable ? 'cursor-pointer' : ''}`}
            {...(openModal && { onClick: () => openModal(file_id ? file_id.toString() : '') })}
          >
            <Grid
              columns="2fr 1fr"
              rows="1fr 1fr"
              align="center"
              className="items-center gap-0"
              justify="center"
            >
              {/* Element 1: File icon + name */}
              <div className="flex items-center col-span-1 row-span-1">
                <Icon icon={fileTypes[getFileExtension(fileNameToUse)].icon} width={20} height={20} color={fileExtensionColor} style={{ flexShrink: 0 }} />
                <div>
                  <Heading size="2" className='text-xs ml-1'>
                    {fileNameToUse}
                  </Heading>
                </div>
              </div>

              {/* Element 2: Status / Download */}
              <div className='flex items-center justify-end col-span-1 row-span-2'>
                {onDownloadClick && (
                  <Button
                    variant="secondary"
                    onClick={async () => {
                      setDownloadStatus('downloading');
                      await onDownloadClick();
                      setDownloadStatus('download');
                    }}
                    disabled={downloadStatus === 'downloading'}
                    className='text-xs'
                    size='sm'
                  >
                    <DownloadIcon width={16} height={16} className='mr-2'/>
                    {downloadStatus === 'downloading' ? 'Downloading...' : 'Download'}
                  </Button>
                )}

                {status && (
                  <Tooltip content={statusMessageIncludes(statusMessage || '') || 'Unknown Status'} side="top">
                    <div className="cursor-help items-center text-center align-center">
                      <Badge
                        variant="soft"
                        radius="full"
                        color={(status && statusInfo[status]) ? statusInfo[status].color : 'gray'}
                        className="max-h-6 text-xs inline-flex text-center cursor-help"
                      >
                        {status || 'Unknown'}
                      </Badge>
                    </div>
                  </Tooltip>
                )}
              </div>

              {/* Element 3: File size + Calendar Icon + Date */}
              <div className="flex items-center text-xs col-span-1 row-span-1">
                {size !== undefined && (
                  <Badge variant="outline" radius="full" color="gray" className="mr-4">
                    <Text align="center" className='text-xs' size="1">
                      {formatFileSize(size)}
                    </Text>
                  </Badge>
                )}
                <CalendarIcon width={12} height={12} className="mr-2 ml-1"/>
                <Text align="center" className='text-xs' size="1">
                  {formattedDate.formattedDate} {formattedDate.formattedTime}
                </Text>
              </div>
            </Grid>
          </div>
        );
      })}
    </div>
  );
};

export default FileDisplay;