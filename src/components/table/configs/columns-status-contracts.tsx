import { generateColumns, extractFilters, ColumnConfig } from '../columns-creator';
import { statusOverviewSchema as schema } from '@/models/schema';

// Define the configuration for the status overview columns
export const columnConfig: ColumnConfig[] = [
  {
    accessorKey: 'check',
    columnType: 'checkbox', // adds a checkbox column at the beginning of the row
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
      searchable: true, // adds a search input above the table
      sortable: true, // adds a sort button to the column header
    },
  },
  {
    accessorKey: 'hoofdaanvrager_emailadres',
    columnType: 'text',
    columnLabel: 'Hoofdaanvrager e-mailadres',
    options: {
      searchable: true,
      sortable: true,
    },
  },
  {
    accessorKey: 'energiecontract_id',
    columnType: 'text',
    columnLabel: 'Energiecontract ID',
    options: {
      sortable: true,
    },
  },
  {
    accessorKey: 'contract_type',
    columnType: 'text',
    columnLabel: 'Contracttype',
    options: {
      sortable: true,
    },
  },
  {
    accessorKey: 'energiemaatschappij_identificatiecode',
    columnType: 'text',
    columnLabel: 'Energieleverancier',
    options: {
      sortable: true,
      selectable: true,
    },
  },
  {
    accessorKey: 'status_code',
    columnType: 'with-icon',
    columnLabel: 'Statuscode',
    options: {
      sortable: true,
      selectable: true,
    },
  },
  {
    accessorKey: 'status_beschrijving',
    columnType: 'text',
    columnLabel: 'Statusbeschrijving',
    options: {
      sortable: true,
    },
  },
  {
    accessorKey: 'bruto_huishoudinkomen',
    columnType: 'euro',
    columnLabel: 'Bruto huishoudinkomen',
    options: {
      sortable: true,
    },
  },
  {
    accessorKey: 'toekenning',
    columnType: 'text',
    columnLabel: 'Toekenning',
    options: {
      sortable: true,
    },
  },
  {
    accessorKey: 'totale_toelage',
    columnType: 'euro',
    columnLabel: 'Totale toelage',
    options: {
      sortable: true,
    },
  },
  {
    accessorKey: 'definitieve_toelage_maandelijks',
    columnType: 'euro',
    columnLabel: 'Maandelijks toelage',
    options: {
      sortable: true,
    },
  },
  {
    accessorKey: 'batch_nummer',
    columnType: 'number',
    columnLabel: 'Batchnummer',
    options: {
      sortable: true,
    },
  },
  {
    accessorKey: 'toelage_bestand',
    columnType: 'text',
    columnLabel: 'Toelage bestand',
    options: {
      sortable: true,
    },
  },
  // Add more columns as needed
];

// Call generateColumns with the StatusOverviewModel schema and statusOverviewConfigurations
export const statusOverviewColumns = generateColumns(columnConfig, schema);
export const { textFilters, selectFilters } = extractFilters(columnConfig);
