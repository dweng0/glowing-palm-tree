import { GridColDef } from "@mui/x-data-grid";

/**
 * The data structure for a row found in the datagrid
 */
export interface Feed { 
    id: number,
    price: number,
    size: number,
    total: number
}

/**
 * Ladder component props
 */
export interface LadderProps {
    columns: GridColDef[],
    data:Array<Feed>,
    priceColour: "red" | "green"
}