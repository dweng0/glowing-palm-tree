import { FeedType }                         from "../../../interface";
import { GridRenderCellParams, GridColDef } from "@mui/x-data-grid";
import { Feed } from "../../Ladder/interface";


/**
 * Focus: cell decoration for price field
 * MUI data grid has exposed events that are not documented, so to get it to flash like a ticker we need to tweak the render
 * (next time I'll stick with aggrid!)
 */
const getPriceField = (color: "red" | "green") => { 
    return { 
        field: "price", 
        headerName: "Price", 
        flex: 1, 
        renderCell: (params: GridRenderCellParams<number>) => (
        <span  id={`row-item-${params.id}`} style={{color: (color === "red") ? "tomato" : "#04AA6D"}}>      
            {(params.value).toLocaleString("en", {style: "currency", currency: "USD", minimumFractionDigits: 2})}
        </span>
    )}
}

/**
 * Takes the feed object, returns its values as an array, without the id
 */
export const getFeedValues = (feed: Feed) => {
    return Object.keys(feed).reduce((acc: string[], key: string) => {
        if(key !== "id") {
            acc.push(feed[key as "price" | "size" | "total"]);
        }
        return acc;
    }
    , []);
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

/**
 * IT: gets columns for Bids or asks depending on arg
 * @param feedType 
 */
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