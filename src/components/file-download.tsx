import React from 'react';
import exportFromJSON from 'export-from-json';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from './ui/dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Separator } from './ui/separator';

interface Props {
  data?: any[]; // Your data to be exported
  filteredData?: number[]; // Your filtered data to be exported
  selectedData?: number[]; // Your selected data to be exported
  buttonProps?: any; // Additional props for the Button component
  fileName: string; // Specify the name for the CSV file
  isLoading?: boolean; // Indicates whether loading is in progress
  isError?: boolean; // Indicates whether loading is in progress
  toSFTP?: boolean; // Indicates whether to export to SFTP
}

type exportDataType = 'all' | 'selected' | 'filtered' | 'selectedOrFiltered';

export const DownloadButton: React.FC<Props> = ({
  data,
  filteredData,
  selectedData,
  buttonProps,
  fileName,
  isLoading = false,
  isError = false,
  toSFTP = false,
}) => {
  const now = new Date();
  const formattedDateTime = now.toISOString().slice(0, 16).replace(/[-T:]/g, '');

  // Combine with your desired filename
  const fileNameWithDate = `${formattedDateTime}-${fileName}`;

  // Handle the download logic here
  // selectedAndFilteredData are just the indices of the data that should be exported
  const getExportData = (dataType: exportDataType) => {
    if (!data) return [];
    try {
      switch (dataType) {
        case 'all':
          return data;
        case 'selected':
          return selectedData ? selectedData.map((index) => data[index]) : [];
        case 'filtered':
          return filteredData ? filteredData.map((index) => data[index]) : [];
        case 'selectedOrFiltered':
          return selectedData
            ? selectedData.map((index) => data[index])
            : filteredData
            ? filteredData.map((index) => data[index])
            : data;
        default:
          return data;
      }
    } catch (e) {
      console.error('Error in getExportData: ', e);
      return data;
    }
  };
  const handleDownload = (dataType: exportDataType) => {
    const exportData = getExportData(dataType);

    // Export to CSV
    exportFromJSON({
      data: exportData,
      fileName: fileNameWithDate,
      exportType: 'csv',
      delimiter: ';', // Specify the delimiter
    });

    // Export to SFTP
    if (toSFTP) {
      console.log('Exporting to SFTP...');
    }
  };
  const disabledInd = isError || isLoading ? true : false;
  const mainButton = (
    <Button
      onClick={() => handleDownload('selectedOrFiltered')} 
      {...buttonProps}
      disabled={disabledInd}
      className='px-3 shadow-none'
    >
      {isLoading ? (
        <>
          <Icon icon='mdi:loading' className='mr-2 h-4 w-4 animate-spin' />
          Laden...
        </>
      ) : isError ? (
        <>
          <Icon icon='mdi:alert-circle' className='mr-2' />
          Geen data
        </>
      ) : (
        <>
          <Icon icon='mdi:download' className='mr-2' />
          Download csv
        </>
      )}
    </Button>
  );

  return (
    <div
      className={
        `flex items-center space-x-1 rounded-md bg-primary text-primary-foreground w-fit` +
        (disabledInd ? ` opacity-50` : ``)
      }
    >
      {mainButton}
      <Separator orientation='vertical' className='h-6 bg-primary-foreground' />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='default' className='px-2 shadow-none'>
            <ChevronDownIcon className='h-4 w-4 text-primary-foreground' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' alignOffset={-5} className='w-fit' forceMount>
          <DropdownMenuLabel className='font-bold'>Download opties</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleDownload('selected')}
            disabled={!selectedData || selectedData.length === 0}
          >
            Download geselecteerde rijen
            <DropdownMenuShortcut className='ml-2'>
              {selectedData?.length || 0}
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDownload('filtered')}
            disabled={!filteredData || filteredData.length === 0}
          >
            Download gefilterde rijen
            <DropdownMenuShortcut className='ml-2'>
              {filteredData?.length || 0}
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDownload('all')}
            disabled={!data || data.length === 0}
          >
            Download ongefilterde dataset
            <DropdownMenuShortcut className='ml-2'>{data?.length || 0}</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
