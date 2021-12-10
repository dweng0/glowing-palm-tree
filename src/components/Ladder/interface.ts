/**
 * Decorator defines how a column will be rendered
 */
export interface ColumnDecorator {
    field: string
}

/**
 * Props for the column presentational component
 */
export interface ColumnProps { 
    items: Array<ColumnDecorator>;
}