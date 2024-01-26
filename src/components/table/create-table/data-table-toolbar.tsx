import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

import { DataTableFacetedFilter } from './data-table-faceted-filter';

import { filterColumnType } from '../columns-creator';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  TextFilterColumns?: filterColumnType[];
  selectFilters?: filterColumnType[];
}

export function DataTableToolbar<TData>({
  table,
  TextFilterColumns,
  selectFilters, // select_filter_columns,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const hasTextFilters = TextFilterColumns && TextFilterColumns.length > 0;

  const [selectedColumn, setSelectedColumn] = useState<filterColumnType | null>(
    hasTextFilters ? TextFilterColumns[0] : null,
  );

  const handleColumnChange = (filterColumnKey: string) => {
    // Reset filter value of previous selected column
    selectedColumn && table.getColumn(selectedColumn?.columnKey)?.setFilterValue('');

    // Get column key + name and set filter value of new selected column
    const filterColumn = TextFilterColumns?.find((column) => column.columnKey === filterColumnKey);
    setSelectedColumn(filterColumn ?? null);
  };

  const selectSearchField = hasTextFilters && (
    <Select
      defaultValue={TextFilterColumns[0].columnKey}
      onValueChange={(e) => {
        handleColumnChange(e);
      }}
    >
      <SelectTrigger className='w-[150px] h-8 opacity-70'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className='font-bold'>Zoek op</SelectLabel>
          {TextFilterColumns.map((filterColumn) => (
            <SelectItem key={filterColumn.columnKey} value={filterColumn.columnKey}>
              {filterColumn.columnName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );

  return (
    <div className='flex items-center justify-between flex-wrap'>
      <div className='flex flex-1 gap-2 items-center flex-wrap'>
        {TextFilterColumns && TextFilterColumns.length > 0 && selectSearchField}
        {selectedColumn && (
          <Input
            key={selectedColumn.columnKey + '-text-input'}
            placeholder={`Zoek op ${selectedColumn.columnName.toLowerCase()}`}
            value={(table.getColumn(selectedColumn.columnKey)?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn(selectedColumn.columnKey)?.setFilterValue(String(event.target.value))
            }
            className='h-8 w-[150px] lg:w-[250px]'
          />
        )}
        {selectFilters &&
          selectFilters.length > 0 &&
          selectFilters.map((column) => {
            return (
              <DataTableFacetedFilter
                key={column.columnKey}
                column={table.getColumn(column.columnKey)}
                title={column.columnName}
                // options={selectFilterOptions.options}
              />
            );
          })}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Herstel filters
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
