import { FeedType } from "../../../interface";
import { GridRenderCellParams, GridColDef } from "@mui/x-data-grid";

const getPriceField = (color: "red" | "green") => { 
    return { 
        field: "price", 
        headerName: "Price", 
        flex: 1, 
        renderCell: (params: GridRenderCellParams<number>) => (
        <span style={{color: (color === "red") ? "tomato" : "#04AA6D"}}>
            {(params.value).toLocaleString("en", {style: "currency", currency: "USD", minimumFractionDigits: 2})}
        </span>
    )}
}


 /**
 * Column to be provided to the ladders, reversed where required
 */
const columns = [
    { field: "size", headername: "Size", flex: 1, 
    renderCell:  (params: GridRenderCellParams<number>) => (
        <span>
            {(params.value).toLocaleString()}
        </span>
    )},
    { field: "total", headername: "Total",  flex: 1,
    renderCell:  (params: GridRenderCellParams<number>) => (
        <span>
            {(params.value).toLocaleString()}
        </span>
    )}
];

const rightAlignedProperties = {align: "right" as "right", headerAlign: "right" as "right"};

const rightAligned = () => columns.map(item => ({...item, ...rightAlignedProperties}));

export const getColumns = (feedType: FeedType): Array<GridColDef> => { 
    switch (feedType) { 
        case "asks": 
            return [...[getPriceField("red")], ...columns.reverse()];
        case "bids":
            return [...rightAligned(), ...[{...getPriceField("green"), ...rightAlignedProperties}]];
        default:
            throw new Error(`Unknown feed type ${feedType}`);
    }
}