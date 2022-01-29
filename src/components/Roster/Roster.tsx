import React, { useState } from 'react';
import { Stack, Button } from '@mui/material';
import { /*useGridApiRef, GridRowId, GridApiRef, GridColumns,*/ GridSelectionModel , GridEnrichedColDef, GridActionsCellItem, DataGrid, GridValueGetterParams, GridRenderCellParams, MuiEvent, GridRowParams, GridEventListener, GridEvents } from '@mui/x-data-grid';
import { ROSTER } from '../../data/roster';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Player } from '../../model/player';



function Roster() {
    //const apiRef = useGridApiRef();
    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
    const [ rowState, setRowState] = useState(ROSTER);

    console.log(rowState);
    const handleRowEditStart = (
        params: GridRowParams,
        event: MuiEvent<React.SyntheticEvent>,
      ) => {
        event.defaultMuiPrevented = true;
      };
    
      const handleRowEditStop: GridEventListener<GridEvents.rowEditStop> = (
        params,
        event,
      ) => {
        event.defaultMuiPrevented = true;
      };
    
      const handleCellFocusOut: GridEventListener<GridEvents.cellFocusOut> = (
        params,
        event,
      ) => {
        event.defaultMuiPrevented = true;
      };

      const getRowMode = (id: number): string => {
        let found: Player | null = getRow(id);
        return found && found.rowMode ? found.rowMode : 'view';
      };

      const getRow = (id: number): Player | null => {
        let found: Player | undefined = rowState.find((item: Player) => item.id === id);
        return found ? found : null;
      };

      const setRowMode = (id: number, mode: string) => {
        let newRowState = Object.assign(rowState);
        let foundIndex = newRowState.findIndex((item: Player) => item.id === id);
        newRowState[foundIndex].rowMode = mode;
        setRowState(newRowState); 
        console.log(rowState);
      };
    
      const handleEditClick = (id: number) => (event: any) => {
        event.stopPropagation();
        //apiRef.current.setRowMode(id, 'edit');
        setRowMode(id, 'edit');
        setSelectionModel([id]);
      };
    
      const handleSaveClick = (id: number) => async (event: any) => {
        //event.stopPropagation();
        // Wait for the validation to run
        //const isValid = await apiRef.current.commitRowChange(id);
        //if (isValid) {
          //apiRef.current.setRowMode(id, 'view');
          setRowMode(id, 'view');
          //const row = apiRef.current.getRow(id);
          //apiRef.current.updateRows([{ ...row, isNew: false }]);
        //}
      };
    
      const handleDeleteClick = (id: number) => (event: any) => {
        //event.stopPropagation();
        //apiRef.current.updateRows([{ id, _action: 'delete' }]);
      };
    
      const handleCancelClick = (id: number) => (event: any) => {
        event.stopPropagation();
        //apiRef.current.setRowMode(id, 'view');
        setRowMode(id, 'view');
        setSelectionModel([id]);
    
        //const row = apiRef.current.getRow(id);
        //if (row!.isNew) {
          //apiRef.current.updateRows([{ id, _action: 'delete' }]);
        //}
      };

      const columns: GridEnrichedColDef[] = [
        {
          field: 'pictureCls',
          headerName: '',
          width: 100,
          editable: false,
          renderCell:	(params: GridRenderCellParams) =>
          <div className={'player-pic ' + params.row.pictureCls}></div>,
        },
        { field: 'number', headerName: 'Number', width: 90 },
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
          valueGetter: (params: GridValueGetterParams) =>
            `${params.row.pos.join(', ')}`,
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
            let isInEditMode = getRowMode(Number(id)) === 'edit';
            if (isInEditMode) {
            return [
                <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={handleSaveClick(Number(id))}
                color="primary"
                />,
                <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(Number(id))}
                color="inherit"
                />,
            ];
            }

            return [
            <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(Number(id))}
                color="inherit"
            />,
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
                sx={{ width: '100%', my: 1 }}
                direction="row"
                alignItems="flex-start"
                columnGap={1}
            >
            <Button size="small" startIcon={<AddIcon />}>
            Add a row
            </Button>
            </Stack>
            <DataGrid
            autoHeight
            editMode="row"
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            onCellFocusOut={handleCellFocusOut}
            rowHeight={67}
            autoPageSize
            pagination
            rows={rowState}
            columns={columns}
            pageSize={10}
            onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
            selectionModel={selectionModel}
            rowsPerPageOptions={[5, 10, 20]}
            />
        </div>
        
    );
  }
  
export default Roster;