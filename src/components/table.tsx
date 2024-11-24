"use client";

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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Payment[] = [
  {
    id: "room1",
    name: "Chill Lounge",
    enableChat: true,
    isPublic: true,
    isPasswordProtected: false,
    password: null,
    maxParticipants: 50,
    ownerId: "user1",
    createdAt: "2024-11-01T10:15:00Z",
  },
  {
    id: "room2",
    name: "Study Group",
    enableChat: false,
    isPublic: false,
    isPasswordProtected: true,
    password: "study123",
    maxParticipants: 10,
    ownerId: "user2",
    createdAt: "2024-11-02T14:20:00Z",
  },
  {
    id: "room3",
    name: "Gaming Room",
    enableChat: true,
    isPublic: true,
    isPasswordProtected: false,
    password: null,
    maxParticipants: 20,
    ownerId: "user3",
    createdAt: "2024-11-03T18:30:00Z",
  },
  {
    id: "room4",
    name: "Yoga Class",
    enableChat: false,
    isPublic: false,
    isPasswordProtected: false,
    password: null,
    maxParticipants: 15,
    ownerId: "user4",
    createdAt: "2024-11-04T08:45:00Z",
  },
  {
    id: "room5",
    name: "Cooking Tips",
    enableChat: true,
    isPublic: true,
    isPasswordProtected: true,
    password: "recipe42",
    maxParticipants: 25,
    ownerId: "user5",
    createdAt: "2024-11-05T12:00:00Z",
  },
  {
    id: "room6",
    name: "Tech Talks",
    enableChat: true,
    isPublic: true,
    isPasswordProtected: false,
    password: null,
    maxParticipants: 100,
    ownerId: "user6",
    createdAt: "2024-11-06T16:15:00Z",
  },
  {
    id: "room7",
    name: "Private Chat",
    enableChat: true,
    isPublic: false,
    isPasswordProtected: true,
    password: "private2023",
    maxParticipants: 5,
    ownerId: "user7",
    createdAt: "2024-11-07T09:30:00Z",
  },
  {
    id: "room8",
    name: "Book Club",
    enableChat: false,
    isPublic: true,
    isPasswordProtected: false,
    password: null,
    maxParticipants: 30,
    ownerId: "user8",
    createdAt: "2024-11-08T11:45:00Z",
  },
  {
    id: "room9",
    name: "Fitness Group",
    enableChat: true,
    isPublic: false,
    isPasswordProtected: false,
    password: null,
    maxParticipants: 15,
    ownerId: "user9",
    createdAt: "2024-11-09T14:00:00Z",
  },
  {
    id: "room10",
    name: "Language Exchange",
    enableChat: true,
    isPublic: true,
    isPasswordProtected: false,
    password: null,
    maxParticipants: 40,
    ownerId: "user10",
    createdAt: "2024-11-10T17:15:00Z",
  },
  {
    id: "room10",
    name: "Language Exchange",
    enableChat: true,
    isPublic: true,
    isPasswordProtected: false,
    password: null,
    maxParticipants: 40,
    ownerId: "user10",
    createdAt: "2024-11-10T17:15:00Z",
  },
  {
    id: "room10",
    name: "Language Exchange",
    enableChat: true,
    isPublic: true,
    isPasswordProtected: false,
    password: null,
    maxParticipants: 40,
    ownerId: "user10",
    createdAt: "2024-11-10T17:15:00Z",
  },
  {
    id: "room10",
    name: "Language Exchange",
    enableChat: true,
    isPublic: true,
    isPasswordProtected: false,
    password: null,
    maxParticipants: 40,
    ownerId: "user10",
    createdAt: "2024-11-10T17:15:00Z",
  },
  {
    id: "room10",
    name: "Language Exchange",
    enableChat: true,
    isPublic: true,
    isPasswordProtected: false,
    password: null,
    maxParticipants: 40,
    ownerId: "user10",
    createdAt: "2024-11-10T17:15:00Z",
  },
  {
    id: "room10",
    name: "Language Exchange",
    enableChat: true,
    isPublic: true,
    isPasswordProtected: false,
    password: null,
    maxParticipants: 40,
    ownerId: "user10",
    createdAt: "2024-11-10T17:15:00Z",
  },
];

export type Payment = {
  id: string;
  name: string;
  enableChat: boolean;
  isPublic: boolean;
  isPasswordProtected: boolean;
  password?: string | null;
  maxParticipants: number;
  ownerId: string;
  createdAt: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },

  {
    accessorKey: "enableChat",
    header: "Chat Enabled",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("enableChat") === true ? "Enabled" : "Disbaled"}
      </div>
    ),
  },

  {
    accessorKey: "isPublic",
    header: "Access Type",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("isPublic") === true ? "Public" : "Private"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created On",
    cell: ({ row }) => {
      const createdTime: string = row.getValue("createdAt");
      const [date, time] = createdTime.split("T");
      return (
        <div className="capitalize">
          <span>{date}</span> <span>{time.replace("Z", "")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "maxParticipants",
    header: "Max Paricipants",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("maxParticipants")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Invite Link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Room</DropdownMenuItem>
            <DropdownMenuItem>Join Room</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="relative max-w-md">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search Room..."
            className="pl-8"
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
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
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
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
