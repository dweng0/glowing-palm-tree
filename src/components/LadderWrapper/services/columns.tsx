import { FeedType } from "../../../interface";
import { GridRenderCellParams, GridColDef } from "@mui/x-data-grid";

 /**
 * Column to be provided to the ladders, reversed where required
 */
const columns = [
    
    { field: "size", headername: "Size", flex: 1 },
    { field: "total", headername: "Total",  flex: 1 }
];

const getPriceField = (color: "red" | "green") => { 
    return { 
        field: "price", 
        headerName: "Price", 
        flex: 1, 
        renderCell: (params: GridRenderCellParams<number>) => (
        <span style={{color: (color === "red") ? "tomato" : "#04AA6D"}}>
            {params.value}     
        </span>
    )}
}

export const getColumns = (feedType: FeedType): Array<GridColDef> => { 
    switch (feedType) { 
        case "asks": 
            return [...[getPriceField("red")], ...columns.reverse()];
        case "bids":
            return [...columns, ...[getPriceField("green")]];
        default:
            throw new Error(`Unknown feed type ${feedType}`);
    }
}