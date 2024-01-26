import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { icons, labels, IconType, LabelType } from './data/data';
import { DataTableColumnHeader } from './create-table/data-table-column-header';
import { DataTableRowActions } from './create-table/data-table-row-actions';
import { z } from 'zod';
import { Icon } from '@iconify/react';

/**
 * Interface representing configuration for a table column.
 *
 * @interface ColumnConfig
 * @property {string} accessorKey - Name of the key in the schema, e.g., 'contract_id'.
 * @property {string} columnType - Type of column, one of ['checkbox', 'text', 'with-icon', 'with-badge', 'action', 'euro',  'number].
 * @property {string} columnLabel - Display name of the column, e.g., 'Contract ID'.
 * @property {object} [options] - Options for the column.
 * @property {boolean} [options.sortable] - Adds a sort (ascending, descending) icon to the column header.
 * @property {boolean} [options.hideable] - Makes it hideable in the dropdown.
 * @property {boolean} [options.searchable] - Adds a search bar to the column header (can only apply to one column).
 * @property {boolean} [options.selectable] - Adds a select dropdown next to the search bar. Provide the options in the next line. Can apply to multiple columns.
 * @property {any} [options.selectOptions] - Options for the select dropdown, potentially with icons. Add all the options to the `data/data.ts` file.
 */
export interface ColumnConfig {
  accessorKey: string;
  columnType: string;
  columnLabel: string;
  options?: {
    sortable?: boolean;
    hideable?: boolean;
    searchable?: boolean;
    selectable?: boolean;
    selectOptions?: any;
  };
}

export const generateColumns = <T extends z.ZodObject<any, any>>(
  configurations: ColumnConfig[],
  schema: z.AnyZodObject,
): ColumnDef<T>[] => {
  const columns: ColumnDef<T>[] = [];

  configurations.forEach((config) => {
    // const schemaField = schema.shape[config.accessorKey];
    // console.log('schemaField:', schemaField);

    const column: ColumnDef<T> = {
      accessorKey: config.accessorKey,
      header: ({ column }) => <DataTableColumnHeader column={column} title={config.columnLabel} />,
      meta: config.columnLabel,
      enableSorting: !config.options || config.options.sortable !== false,
      enableHiding: !config.options || config.options.hideable !== false,
      filterFn: 'includesString',
    };

    if (config.columnType === 'checkbox') {
      column.id = 'select';
      column.header = ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label='Select all'
          className='translate-y-[2px]'
        />
      );
      column.cell = ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
          className='translate-y-[2px]'
          onClick={(e) => e.stopPropagation()}
        />
      );
      column.enableSorting = false;
      column.enableHiding = false;
    } else if (config.columnType === 'with-badge') {
      column.cell = ({ row }) => {
        const label = labels.find(
          (label: LabelType) => label.value === row.getValue(config.accessorKey),
        );

        return (
          <div className='flex space-x-2'>
            {label && <Badge variant='secondary'>{label.label}</Badge>}
            <span>{row.getValue(config.accessorKey)}</span>
          </div>
        );
      };
    } else if (config.columnType === 'with-icon') {
      column.cell = ({ row }) => {
        const icon = icons.find(
          (icon: IconType) => icon.value === row.getValue(config.accessorKey),
        );

        if (!icon) {
          return row.getValue(config.accessorKey);
        }

        return (
          <div className='flex items-center'>
            {icon.icon && <Icon icon={icon.icon} className='mr-2 h-4 w-4 text-muted-foreground' />}
            <span>{row.getValue(config.accessorKey)}</span>
          </div>
        );
      };
      column.filterFn = (row, id, value) => {
        return value.includes(row.getValue(id));
      };
    } else if (config.columnType === 'number') {
      column.id = config.accessorKey;
      column.cell = ({ row }) => {
        // Retrieve the value
        const value = row.getValue(config.accessorKey);

        // Check if the value is null, undefined, or not a number
        if (value === null || value === undefined || isNaN(Number(value))) {
          return '';
        }

        // Format number with thousands separator
        return Number(value).toLocaleString();
      };
      if (!config.options || config.options.searchable !== true) {
        column.filterFn = (row, id, value) => {
          return value.includes(row.getValue(id));
        };
      }
    } else if (config.columnType === 'euro') {
      column.id = config.accessorKey;
      column.cell = ({ row }) => {
        // Retrieve the value and check if it's null, undefined, or not a number
        const value = row.getValue(config.accessorKey);
        const euro = Number(value);
        if (value === null || value === undefined || isNaN(euro)) {
          return '';
        }

        // Format number as Euro currency
        let formattedEuro = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'EUR',
        }).format(euro);

        // Modify formatting for whole numbers
        if (formattedEuro.endsWith(',00')) {
          formattedEuro = formattedEuro.replace(',00', ',-');
        } else if (formattedEuro.endsWith('.00')) {
          formattedEuro = formattedEuro.replace('.00', '.-');
        }

        return formattedEuro;
      };
      if (!config.options || config.options.searchable !== true) {
        column.filterFn = (row, id, value) => {
          return value.includes(row.getValue(id));
        };
      }
    } else if (config.columnType === 'actions') {
      column.id = 'actions';
      column.cell = ({ row }) => <DataTableRowActions row={row} schema={schema} />;
    } else {
      column.id = config.accessorKey;
      column.cell = ({ row }) => row.getValue(config.accessorKey);
      if (!config.options || config.options.searchable !== true) {
        column.filterFn = (row, id, value) => {
          return value.includes(row.getValue(id));
        };
      }
    }

    columns.push(column);
  });

  return columns;
};

export interface filterColumnType {
  columnKey: string;
  columnName: string;
}

export interface selectFiltersType {
  columnNames: filterColumnType[];
  columnOptions: { columnKey: string; options: any }[];
}

/**
 * Extracts information about searchable and selectable columns from the given configurations.
 *
 * @param {ColumnConfig[]} configurations - Array of column configurations.
 * @returns {Object} - An object containing information about searchable and selectable columns.
 * @property {string | undefined} textFilter - Accessor key of the searchable column, or undefined if not found.
 * @property {Object} selectFilters - Information about selectable columns.
 * @property {Object[]} selectFilters.columnNames - Array of objects containing accessor key and column label for each selectable column.
 * @property {Object[]} selectFilters.columnOptions - Array of objects containing accessor key and select options for each selectable column.
 */
export const extractFilters = (configurations: ColumnConfig[]) => {
  // const textFilterColumn = configurations.find((config) => config.options?.searchable === true);
  const textFilterColumns = configurations.filter((config) => config.options?.searchable === true);
  const selectFilterColumns = configurations.filter(
    (config) => config.options?.selectable === true,
  );

  // const textFilter = textFilterColumn?.accessorKey;
  const textFilters: filterColumnType[] = textFilterColumns.map((config) => ({
    columnKey: config.accessorKey,
    columnName: config.columnLabel,
  }));

  const selectFilters: filterColumnType[] = selectFilterColumns.map((config) => ({
    columnKey: config.accessorKey,
    columnName: config.columnLabel,
  }));
  return { textFilters, selectFilters };
};
