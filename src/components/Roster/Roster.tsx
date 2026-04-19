import React from 'react';
import { Stack, Button } from '@mui/material';
import { GridColDef, GridActionsCellItem, DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { ROSTER } from '../../data/roster';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Player } from '../../model/player';



function Roster() {
    //const apiRef = useGridApiRef();
    const rowState = ROSTER;

    console.log(rowState);

      const handleDeleteClick = (id: number) => (event: any) => {
        //event.stopPropagation();
        //apiRef.current.updateRows([{ id, _action: 'delete' }]);
      };

      const columns: GridColDef[] = [
        {
          field: 'pictureCls',
          headerName: '',
          width: 100,
          editable: false,
          renderCell:	(params: GridRenderCellParams) =>
          <div className={'player-pic ' + params.row.pictureCls}></div>,
        },
        { field: 'number', type: 'number', headerName: 'Number', width: 90, editable: true, },
        {
          field: 'playerName',
          headerName: 'Player name',
          width: 150,
          editable: true,
        },
        {
          field: 'pos',
          headerName: 'Position',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (_value: unknown, row: Player) =>
            `${row.pos.join(', ')}`,
        },
        {
          field: 'batArm',
          headerName: 'Batting',
          width: 90,
          editable: true,
        },
        {
          field: 'throwArm',
          headerName: 'Throwing',
          width: 90,
          editable: true,
        },
        {
          field: 'height',
          headerName: 'Height',
          width: 75,
          editable: true,
        },
        {
          field: 'weight',
          headerName: 'Weight',
          type: 'number',
          width: 75,
          editable: true,
        },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 70,
          editable: true,
        },
        {
          field: 'experience',
          headerName: 'Experience',
          type: 'number',
          width: 100,
          editable: true,
        },
        {
          field: 'birthplace',
          headerName: 'Birthplace',
          width: 180,
          editable: true,
        },
        {
          field: 'college',
          headerName: 'College',
          width: 110,
          editable: true,
        },
        {
          field: 'salary',
          headerName: 'Salary',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: 'category',
          headerName: 'Category',
          width: 110,
          editable: true,
        },
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Actions',
          width: 100,
          cellClassName: 'actions',
          getActions: ({ id }) => {
            //const isInEditMode = apiRef.current.getRowMode(id) === 'edit';
            return [
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(Number(id))}
                color="inherit"
            />,
            ];
          }
          
        }
      ];
    

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <Stack
                sx={{ width: '100%', my: 1, alignItems: 'flex-start', columnGap: 1 }}
                direction="row"
            >
            <Button size="small" startIcon={<AddIcon />}>
            Add a row
            </Button>
            </Stack>
            <DataGrid
            autoHeight
            editMode="row"
            rowHeight={67}
            pagination
            rows={rowState}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 20]}
            />
        </div>
        
    );
  }
  
export default Roster;