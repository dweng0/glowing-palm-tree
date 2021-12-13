import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Price', width: 150 },
  { field: 'col2', headerName: 'Size', width: 150 },
  { field: 'col2', headerName: 'Total', width: 150 },
];

const testData = [[3899.6,0.0],[3899.65,2000.0],[3899.8,0.0],[3899.95,5013.0],[3900.0,75166.0],[3900.05,0.0],[3900.6,2000.0],[3900.75,0.0],[3900.9,0.0],[3900.95,0.0],[3901.0,0.0],[3901.55,0.0],[3901.6,2000.0],[3901.65,0.0],[3901.7,0.0],[3901.75,0.0],[3901.85,0.0],[3901.9,0.0],[3901.95,4803.0],[3902.0,0.0],[3902.4,10849.0],[3902.5,0.0],[3902.55,37000.0],[3902.7,0.0],[3902.9,0.0],[3903.0,19323.0],[3903.5,0.0],[3903.55,2000.0],[3903.7,0.0],[3903.85,0.0],[3903.9,0.0],[3903.95,0.0]];

testData.reduce((acc, curr) => { 
    // if we havebids at that price... render it
    if(curr[1] > 0) {
        acc.push({price:curr[0], size:curr[1]});
    }
    return acc;

 }, []);
const Ladder:React.FunctionComponent = () => {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
export default Ladder;