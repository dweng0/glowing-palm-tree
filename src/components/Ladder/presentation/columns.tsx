import React from 'react';
import { ColumnProps, ColumnDecorator } from '../interface';
import { AgGridColumn } from 'ag-grid-react';

const Columns: React.FunctionComponent<ColumnProps> = ({items}) => { 

    const renderAgColumn = (column: ColumnDecorator, index: number) => <AgGridColumn key={`column-${index}`} field={column.field} />
    return <>{items.map(renderAgColumn)}</>
}
export default Columns

