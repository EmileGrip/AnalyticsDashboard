import { generateColumns, extractFilters, ColumnConfig } from '../columns-creator';
import { SimplifiedLogEventSchema as schema } from '@/models/schema';

// Define the configuration for the requests API columns
export const columnConfig: ColumnConfig[] = [
  {
    accessorKey: 'dateTime',
    columnType: 'text',
    columnLabel: 'Datum / tijd',
    options: {
      searchable: false,
      sortable: true,
      selectable: false,
    },
  },
  {
    accessorKey: 'type',
    columnType: 'text',
    columnLabel: 'Logtype',
    options: {
      searchable: false,
      sortable: true,
      selectable: true,
    },
  },
  {
    accessorKey: 'errorMessage',
    columnType: 'text',
    columnLabel: 'Error message',
    options: {
      searchable: true,
      sortable: true,
    },
  },
  {
    accessorKey: 'origin',
    columnType: 'text',
    columnLabel: 'URL',
    options: {
      searchable: false,
      sortable: true,
      selectable: true,
    },
  },
  {
    accessorKey: 'platform_browser',
    columnType: 'text',
    columnLabel: 'Platform/Browser',
    options: {
      searchable: false,
      sortable: true,
      selectable: true,
    },
  },
  {
    accessorKey: 'path',
    columnType: 'text',
    columnLabel: 'Pagina',
    options: {
      searchable: true,
      sortable: true,
      selectable: true,
    },
  },
  // Add more columns as needed
];
// Call generateColumns with the logs schema and configurations
export const logsColumns = generateColumns(columnConfig, schema);
export const { textFilters, selectFilters } = extractFilters(columnConfig);
