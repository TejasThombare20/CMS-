  import * as React from "react";

  import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  import { ArrowUpDown, ChevronDown } from "lucide-react";
  import { Checkbox } from "components/ui/checkbox";
  import { Button } from "components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "components/ui/dropdown-menu";
  import { Input } from "components/ui/input";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "components/ui/table";

  type Props = {
    attributes: Record<string, any>;
  };

  export function Attributes({ attributes }: Props) {
    const data = Object.entries(attributes).map(
      ([attributeName, attributeDetails]) => ({
        attributeName,
        type: attributeDetails.type,
        allowNull: attributeDetails.allowNull,
        defaultValue: attributeDetails.defaultValue,
        primaryKey: attributeDetails.primaryKey,
        autoIncrement: attributeDetails.autoIncrement,
      })
    );
    const columns: ColumnDef<(typeof data)[0]>[] = [
      {
        accessorKey: "attributeName",
        enableResizing: true,
        size: 200,
        header: "Attribute",
        cell: ({ row }) => <div>{row.getValue("attributeName")}</div>,
      },
      {
        accessorKey: "type",
        enableResizing: true,
        size: 200,
        header: "DataType",
        cell: ({ row }) => <div>{row.getValue("type")}</div>,
      },
      {
        accessorKey: "allowNull",
        enableResizing: true,
        size: 100,
        header: "Required",
        cell: ({ row }) => (
          <div>
            <Checkbox checked={!row.getValue("allowNull")} disabled />
          </div>
        ),
      },
      {
        accessorKey: "defaultValue",
        enableResizing: true,
        size: 100,
        header: "Default Value",
        cell: ({ row }) => <div>{row.getValue("defaultValue")}</div>,
      },
      {
        accessorKey: "primaryKey",
        enableResizing: true,
        size: 100,
        header: "Primary Key",
        cell: ({ row }) => (
          <div>
            <Checkbox checked={row.getValue("primaryKey")} disabled />
          </div>
        ),
      },
      {
        accessorKey: "autoIncrement",
        enableResizing: true,
        size: 100,
        header: "Auto Increment",
        cell: ({ row }) => (
          <div>
            <Checkbox checked={row.getValue("autoIncrement")} disabled />
          </div>
        ),
      },
    ];

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
    );
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [pagination, setPagination] = React.useState({
      pageIndex: 0, //initial page index
      pageSize: 5, //default page size
    });

    const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,  
      onRowSelectionChange: setRowSelection,
      autoResetPageIndex: false,
      autoResetExpanded: false,
      onPaginationChange: setPagination,
      // defaultColumn: {
      //   size: 100, //starting column size
      //   minSize: 50, //enforced during column resizing
      //   maxSize: 500,
      // },

      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
        pagination,
      },
    });

    return (
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter attributes.."
            value={
              (table.getColumn("attributeName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("attributeName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
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
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }
