'use client';

import { Paper } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridPaginationModel
} from '@mui/x-data-grid';

type TableComponentProps = {
  columns: GridColDef[];
  rows: { [key: string]: string | number }[];
  paginationActive: boolean;
  pageSize: number;
  setPageSize: (newSize: number) => void;
  rowHeight?: number;
  showCheckbox?: boolean;
  headerStyle?: {
    backgroundColor?: string;
    fontWeight?: string | number;
  };
  onRowClick?: (params: GridRowParams) => void;
};

export default function MuiTableComponent({
  columns,
  rows,
  pageSize,
  setPageSize,
  rowHeight,
  showCheckbox,
  headerStyle,
  onRowClick
}: TableComponentProps) {
  const handlePaginationChange = (model: GridPaginationModel) => {
    setPageSize(model.pageSize);
  };

  const handleRowClick = (params: GridRowParams) => {
    onRowClick?.(params);
  };

  return (
    <Paper className="flex-1 overflow-hidden">
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={{ page: 0, pageSize }}
        onPaginationModelChange={handlePaginationChange}
        pageSizeOptions={[5, 10, 20, 50]}
        checkboxSelection={showCheckbox}
        disableColumnFilter
        disableColumnMenu
        disableRowSelectionOnClick
        rowHeight={rowHeight}
        onRowClick={handleRowClick}
        sx={{
          border: 0,
          paddingLeft: 2,
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: headerStyle?.backgroundColor ?? 'transparent'
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: headerStyle?.fontWeight ?? 'normal'
          },
          '& .MuiDataGrid-row': {
            cursor: `${onRowClick && 'pointer'}`
          }
        }}
      />
    </Paper>
  );
}
