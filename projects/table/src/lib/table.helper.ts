// import { DatePipe } from "@angular/common";
import { PipeTransform } from "@angular/core";

export interface TableColumn {
    id: string;
    header: string;
    sticky?: 'start' | 'end';
    sort?: 'asc' | 'desc';
    columnClass?: string;
    headerClass?: string;
    cellClass?: string;
    pipe?: {
        transform: PipeTransform,
        arguments: [];
    }
}
export interface TableRowAction {
    id: string;
    text: string;
    icon?: string;
}
export interface TableProperties {
    tableStyle?: {};
    headersStyle?: {};
    cellsStyle?: {};
    columnsStyle?: {};
    tableClass?: string;
    columnsClass?: string;
    headersClass?: string;
    cellsClass?: string;
    filtrable?:boolean;
    sortable?:boolean;
    // style?:{
    //     table?:string;
    //     headers?:string;
    //     cells?:string;
    //     columns?:string;
    // };
    // class?:{
    //     table?:string;
    //     headers?:string;
    //     cells?:string;        
    //     columns?:string;
    // };
    columns: TableColumn[];
    actions?: TableRowAction[];
}

export class RobinHubTableHelper {
    private _tableStyle: {};
    private _headersStyle: {};
    private _cellsStyle: {};
    private _columnsStyle: {};
    private _tableClass: string;
    private _headersClass: string;
    private _cellsClass: string;
    private _columnsClass: string;
    private _actions: TableRowAction[] | undefined;
    private _columns: TableColumn[] = [];
    private _columnDefs:string[] = [];
    private _filtrable:boolean;
    private _sortable:boolean;
    constructor(
        props: TableProperties,
        // private _datePipe: DatePipe,
    ) {
        this._tableStyle = props.tableStyle ? props.tableStyle : {};
        this._headersStyle = props.headersStyle ? props.headersStyle : {};
        this._cellsStyle = props.cellsStyle ? props.cellsStyle : {};
        this._columnsStyle = props.columnsStyle ? props.columnsStyle : {};
        this._tableClass = props.tableClass ? props.tableClass : '';
        this._headersClass = props.headersClass ? props.headersClass + ' ' : '';
        this._cellsClass = props.cellsClass ? props.cellsClass + ' ' : '';
        this._columnsClass = props.columnsClass ? props.columnsClass + ' ' : '';
        this._columns = props.columns;
        this._filtrable = props.filtrable?props.filtrable:false;
        this._sortable = props.sortable?props.sortable:false;
        for (let column of props.columns) {
            this._columnDefs.push(column.id);
        }
        if (props.actions) {
            this._actions = props.actions;
            this._columnDefs.push("robinhubTableActions");
        }
    }
    get columnDefs() {
        return this._columnDefs;
    }
    get columns(): TableColumn[] {
        return this._columns;
    }
    // isColumnSticky(column) {
    //     return this._config.columns[column].sticky;
    // }
    // getColumnHeader(column) {
    //     return this._config.columns[column].text;
    // }
    get tableStyle() {
        return this._tableStyle;
    }
    get tableClass() {
        return this._tableClass;
    }
    get filtrable(){
        return this._filtrable;
    }
    get sortable(){
        return this._sortable;
    }
    get actions() {
        return this._actions;
    }
    isColumnStickyStart(column: TableColumn) {
        return column.sticky && column.sticky === 'start';
    }
    isColumnStickyEnd(column: TableColumn) {
        return column.sticky && column.sticky === 'end';
    }
    getColumnHeaderClass(column: TableColumn) {
        return [this._columnsClass, this._headersClass,
        column.columnClass ? column.columnClass : '',
        column.headerClass ? column.headerClass : ''];
    }
    getColumnCellClass(column: TableColumn) {
        return [this._columnsClass, this._cellsClass,
        column.columnClass ? column.columnClass : '',
        column.cellClass ? column.cellClass : ''];
    }
    getColumnCell(row:any, column: TableColumn) {
        if (column.pipe) {
            return column.pipe.transform.transform(row[column.id], column.pipe.arguments);
        }
        return row[column.id];
        // switch (this._config.columns[column].type) {
        //     case "datetime":
        //         return this._datePipe.transform(row[column], 'yyyy-MM-dd HH:mm:ss');
        //     default:
        //         return row[column];
        // }
    }
    hasActions() {
        return this._actions != null;
    }


}