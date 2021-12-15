import { GridColDef } from "@mui/x-data-grid";

export interface Feed { 
    id: number,
    price: number,
    size: number,
    total: number
}

export interface LadderProps {
    columns: GridColDef[],
    data:Array<Feed>
}