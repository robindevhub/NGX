import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { RobinHubTableDataSource } from './table-datasource';
import { RobinHubTableHelper, TableColumn, TableProperties } from './table-helper';
@Component({
  selector: 'robinhub-table',
  styleUrls: ['table.scss'],
  templateUrl: 'table.html'
})
export class RobinHubTable implements OnInit, OnDestroy, AfterViewInit {

  _sortables = {};
  _tableHelper!: RobinHubTableHelper;

  @Output() readonly onAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() readonly onRowClick: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  properties!: TableProperties;

  @Input()
  dataSource!: RobinHubTableDataSource<any>;
  constructor() {

  }
  ngOnInit(): void {
    this._tableHelper = new RobinHubTableHelper(this.properties ? this.properties : { columns: [] });
  }
  ngOnDestroy(): void {

  }
  ngAfterViewInit(): void {
    // this.dataSource.sort = this._sort;
  }
  doAction(action: any, row: any) {
    if (this.onAction) {
      this.onAction.emit({ action: action, row: row });
    }
  }
  doRowClick(row: any) {
    if (this.onRowClick) {
      this.onRowClick.emit(row);
    }
  }
  // doSort(column) {
  //     let sortable = this._sortables[column.id];
  //     if (!sortable) {
  //         sortable = {
  //             id: column.id,
  //             start: '',
  //             disableClear: true
  //         }
  //         this._sortables[column.id] = sortable;
  //     }
  //     if (sortable.start === "asc") {
  //         sortable.start = "desc";
  //     } else if (sortable.start === "desc") {
  //         sortable.start = "";
  //     } else {
  //         sortable.start = "asc";
  //     }

  //     // this._sort.sort(sortable);
  //     this.dataSource.sort.sort(sortable);
  // }
  doFilter(column: TableColumn, event: any) {
    if (this.dataSource) {
      this.dataSource.filter = {
        column: column.id,
        value: event.srcElement.value
      }
    }
  }
}
