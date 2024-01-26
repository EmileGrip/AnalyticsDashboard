import { generateColumns, extractFilters, ColumnConfig } from '../columns-creator';
import { requestsSchema as schema } from '@/models/schema';

// Define the configuration for the requests API columns
export const columnConfig: ColumnConfig[] = [
  {
    accessorKey: 'check',
    columnType: 'checkbox',
    columnLabel: '',
    options: {
      sortable: false,
      hideable: false,
    },
  },
  {
    accessorKey: 'toetsing_referentienummer',
    columnType: 'text',
    columnLabel: 'Aanvraag ID',
    options: {
      searchable: true,
      sortable: true,
    },
  },
  {
    accessorKey: 'energiecontract_id',
    columnType: 'text',
    columnLabel: 'Contract ID',
    options: {
      searchable: true,
      sortable: true,
    },
  },
  {
    accessorKey: 'status_code',
    columnType: 'with-icon',
    columnLabel: 'Statuscode',
    options: {
      selectable: true,
      sortable: true,
    },
  },
  {
    accessorKey: 'energiemaatschappij_identificatiecode',
    columnType: 'text',
    columnLabel: 'Energieleverancier',
    options: {
      hideable: true,
      selectable: true,
      sortable: true,
    },
  },
  // Add more columns as needed
];
// Call generateColumns with the requests schema and configurations
export const requestsColumns = generateColumns(columnConfig, schema);
export const { textFilters, selectFilters } = extractFilters(columnConfig);
