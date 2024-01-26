// import * as React from 'react';
import { useEffect, useState } from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DataTablePagination } from './create-table/data-table-pagination';
import { DataTableToolbar } from './create-table/data-table-toolbar';

import { ScrollAreaWithButton } from './scroll-area';

import { filterColumnType } from './columns-creator';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | any;
  textFilters?: filterColumnType[];
  selectFilters?: filterColumnType[];
  openModalFunction?: (contractId: string) => void;
  openModalField?: string;
  showDataTableToolbar?: boolean;
  onDownload?: (selectedIDs: number[], filteredIDs: number[]) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  textFilters,
  selectFilters,
  openModalFunction,
  openModalField,
  showDataTableToolbar = true,
  onDownload,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isTextSelected, setIsTextSelected] = useState(false);

  const handleMouseDown = () => {
    setIsTextSelected(false);
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString() : '';
    setIsTextSelected(selectedText.length > 0);
  };

  const showModal = (id: string) => () => {
    if (!isTextSelected && openModalFunction) {
      openModalFunction && openModalFunction(id);
    }
  };

  useEffect(() => {
    const updateSelectedIds = () => {
      // const model =
      //   table.getFilteredSelectedRowModel().rows.length !== 0
      //     ? table.getFilteredSelectedRowModel().flatRows
      //     : table.getFilteredRowModel().flatRows;
      const selectedIds = table.getFilteredSelectedRowModel().flatRows.map((row) => row.index);
      const filteredIds = table.getFilteredRowModel().flatRows.map((row) => row.index);
      onDownload && onDownload(selectedIds, filteredIds);
    };

    updateSelectedIds();
  }, [rowSelection, columnFilters]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // const updateParentData = useCallback(() => {
  //   const getSelectedAndFilteredData = () => {
  //     const model =
  //       table.getFilteredSelectedRowModel().rows.length !== 0
  //         ? table.getFilteredSelectedRowModel().flatRows
  //         : table.getFilteredRowModel().flatRows;

  //     return model.map((row) => row.index);
  //   };

  //   if (onDownload) {
  //     onDownload(getSelectedAndFilteredData());
  //   }
  // }, [onDownload]);

  // useMountedLayoutEffect(() => {
  //   // Only trigger when the selection or filters change.
  //   updateParentData();
  // }, [updateParentData, rowSelection, columnFilters]);
  // if (onDownload) {
  // Call this function whenever the selection changes

  // // Use useMemo to memoize computation
  // const filteredSelectedModel = useMemo(() => table.getFilteredSelectedRowModel(), [table]);
  // const filteredModel = useMemo(() => table.getFilteredRowModel(), [table]);

  // const getSelectedAndFilteredData = useCallback(() => {
  //   return filteredSelectedModel.rows.length !== 0
  //     ? filteredSelectedModel.flatRows.map((row) => row.index)
  //     : filteredModel.flatRows.map((row) => row.index);
  // }, [filteredSelectedModel, filteredModel]);

  // const updateParentData = useCallback(() => {
  //   onDownload?.(getSelectedAndFilteredData());
  // }, [onDownload, getSelectedAndFilteredData]);

  // useEffect(() => {
  //   updateParentData();
  // }, [updateParentData]);

  // Rest of your component (e.g., rendering logic)

  return (
    <div className='space-y-4'>
      {showDataTableToolbar && (
        <DataTableToolbar
          table={table}
          TextFilterColumns={textFilters}
          selectFilters={selectFilters}
        />
      )}
      <ScrollAreaWithButton
        direction='horizontal'
        distanceToTopClass='top-scroll-button'
        type='auto'
      >
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={openModalFunction && 'cursor-pointer'}
                    onClick={openModalFunction && showModal(row.getValue(openModalField || ''))}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    Geen resultaten.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollAreaWithButton>
      {/* </ScrollArea> */}
      <DataTablePagination table={table} />
    </div>
  );
}
