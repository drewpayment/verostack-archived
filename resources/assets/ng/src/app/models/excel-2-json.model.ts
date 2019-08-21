export interface IConvertMessageData {
    uid?: string;
    data: Uint8Array | File;
    sheet?: string;
    styles?: boolean;
    wasmPath?: string;
}

export interface IReadyMessageData {
    uid: string;
    data: ISheetData[];
    styles: IStyle[];
}

export interface ISheetData {
    name: string;
    cols: IColumnData[];
    rows: IRowData[];
    cells: IDataCell[][];   // null for empty cell

    merged: IMergedCell[];
}

export interface IMergedCell {
    from: IDataPoint;
    to: IDataPoint;
}

export interface IDataPoint {
    column: number; 
    row: number;
}

export interface IColumnData {
    width: number;
}

export interface IRowData {
    height: number;
}

export interface IDataCell {
    v: string;
    s: number;
}

export interface IStyle {
    fontSize?: string;
    fontFamily?: string;

    background?: string;
    color?: string;

    fontWeight?: string;
    fontStyle?: string;
    textDecoration?: string;

    textAlign?: string;
    verticalAlign?: string;

    borderLeft?: string;
    borderTop?: string;
    borderBottom?: string;
    borderRight?: string;

    format?: string;
}

export interface ExportedCell {
    cell: string,
    css: string,
    value: string,
}
