import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild, OnChanges, OnInit, SimpleChanges, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox, MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule } from "@angular/material/table";
import { IBaseTable, IColumns, IPaginationOptions, ITableActions } from '../../interfaces';
import { MenuComponent } from '../menu/menu.component';
import { CheckboxListMenuComponent } from '../checkbox-list-menu/checkbox-list-menu.component';
import { CheckListMenuInput } from '../checkbox-list-menu/checkbox-list-menu.interface';
import { StorageService } from '../../../storage';
import { BaseTableStorage, TableStyleClass } from './table.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToggleComponent } from '../toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SelectAutocompleteComponent } from '../select-autocomplete/select-autocomplete.component';
import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ui-base-table',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    CommonModule,
    MatPaginatorModule,
    MenuComponent,
    CheckboxListMenuComponent,
    MatButtonModule,
    MatIconModule,
    ToggleComponent,
    MatTooltipModule,
    SelectAutocompleteComponent,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BaseTableComponent<T> implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('paginator') paginator: MatPaginator
  @ViewChild("allCheckbox") allCheckbox: MatCheckbox
  @ViewChild("table") table: MatTable<T>

  allCheckboxComponent: MatCheckbox

  selectAll: boolean = false
  initial: boolean = false

  @Input() baseTable: IBaseTable<T> = {
    dataSource: [],
    columns: [],
    actions: [],
    paginateOptions: {
      page: 0,
      pageSize: 10,
    }
  }

  @Input() showActions: boolean = true
  @Input() selecteable: boolean = false

  @Input() tableStyleClass: TableStyleClass = 'base-table-primary'

  @Output() selectedRows: EventEmitter<T[]> = new EventEmitter<T[]>()
  @Output() onDragChange: EventEmitter<T[]> = new EventEmitter<T[]>()

  @Output() onPageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>()

  checkboxListMenuInput: CheckListMenuInput = {
    menu: {
      overlayButtonInput: {
        icon: 'settings',
        color: 'primary',
        isOpen: false,
        isLoading: false,
        text: '',
        menuStyle: true
      },
    },
    checkboxList: []
  }

  selection = new SelectionModel<any>(true, [])

  set paginatorOptions(pagination: IPaginationOptions) {
    this.paginator.pageIndex = pagination.page as number
    this.paginator.pageSize = pagination.pageSize as number
  }

  set actions(actions: ITableActions<T>[]) {
    this.baseTable = {
      ...this.baseTable,
      actions,
    }
  }

  public _dataSource: MatTableDataSource<T[]> = new MatTableDataSource<T[]>([]);

  public displayedColumns: string[];

  constructor(
    private storageService: StorageService<BaseTableStorage<T>>,
    private paginationStorageService: StorageService<number>,
  ) { }

  ngOnInit(): void {
    // If the table has a storeKey and columns, set the baseTable columns to the storage columns
    try {
      if (this.tableKey() && this.storageColumns()) {
        if (this.storageColumns().length != this.baseTable.columns.length) {
          this.baseTable = {
            ...this.baseTable,
            columns: this.baseTable.columns,
          }
          this.setDisplayedColumns()
        } else {
          this.baseTable = {
            ...this.baseTable,
            columns: this.storageColumns()
          }
          this.displayedColumns = this.displayedStorageColumns()
        }
      } else {
        // If the table has columns, set the displayed columns to the columns
        this.setDisplayedColumns()
      }
    } catch (error) {
      this.setDisplayedColumns()
    }

    this.setColumnCheckboxList()

    this._dataSource = new MatTableDataSource<T[]>([...this.baseTable.dataSource] as any)

    if (this.selecteable) {
      this.displayedColumns.unshift('select')
      this.baseTable.columns.unshift({
        caption: 'select',
        field: {
          key: ''
        },
        show: true
      })
    }

    this.initial = true
  }

  ngAfterViewInit(): void {
    this.allCheckboxComponent = this.allCheckbox
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['baseTable']) {
      if (this.initial) {
        if (changes['baseTable'].currentValue.paginateOptions) {
          this.paginatorOptions = {
            page: this.baseTable.paginateOptions?.page,
            pageSize: this.baseTable.paginateOptions?.pageSize
          }
        }

        this._dataSource = new MatTableDataSource(this.baseTable.dataSource as any)
        this.selection.clear()
        this.selectedRows.emit([])

        if (this.allCheckboxComponent) {
          this.allCheckboxComponent.checked = false
        }
      }

      if (changes['baseTable'].currentValue.actions) {
        const hasActions = changes['baseTable'].currentValue.actions.length > 0

        if (hasActions) {
          this.pushActionColumn()
        } else {
          this.removeActionColumn()
        }

        this.actions = changes['baseTable'].currentValue.actions
      }

      if (changes['selecteable']) {
        const hasSelectOption = this.baseTable.columns.find((column: IColumns<T>) => column.caption === 'select')

        if (hasSelectOption) {
          this.baseTable.columns.shift()
        }
      }
    }
  }

  parseActions(element: T): ITableActions<T>[] {
    let response: ITableActions<T>[] = []

    response = this.baseTable.actions ? this.baseTable.actions?.map((result) => {
      return {
        name: result.name,
        element: element,
        action: result.action,
        icon: result.icon,
        hide: result.hide,
        testId: result?.testId || '',
        svg: result.svg,
      }
    }) : [] as any

    return response
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;

    let dataSourceFiltered = this._dataSource.data

    dataSourceFiltered = dataSourceFiltered.filter((row: any) => {
      return (this.baseTable.disableRowSelector ? !this.baseTable.disableRowSelector(row) : null) || false
    })

    const numRows = dataSourceFiltered.length;

    return numSelected === numRows;
  }

  pushActionColumn(): void {
    const alreadyHasActions = this.displayedColumns?.find((column: string) => column === 'actions')
    if (alreadyHasActions) return
    this.displayedColumns?.push('actions')
  }

  removeActionColumn(): void {
    const alreadyHasActions = this.displayedColumns?.find((column: string) => column === 'actions')
    if (!alreadyHasActions) return
    this.displayedColumns = this.displayedColumns?.filter((column: string) => column !== 'actions')
  }

  pushSelectColumn(): void {
    const alreadyHasSelect = this.displayedColumns?.find((column: string) => column === 'select')
    if (alreadyHasSelect) return
    this.displayedColumns?.push('select')
  }

  removeSelectColumn(): void {
    const alreadyHasSelect = this.displayedColumns?.find((column: string) => column === 'select')
    if (!alreadyHasSelect) return
    this.displayedColumns = this.displayedColumns?.filter((column: string) => column !== 'select')
  }

  onClearSelection(): void {
    this.selection.clear()
    this.selectedRows.emit([])
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.selectedRows.emit([])
      return;
    }

    let dataSourceFiltered = this._dataSource.data

    dataSourceFiltered = dataSourceFiltered.filter((row: any) => {
      return (this.baseTable.disableRowSelector ? !this.baseTable.disableRowSelector(row) : null) || false
    })

    this.selection.select(...dataSourceFiltered);
    this.selectedRows.emit(dataSourceFiltered as T[])
  }

  onPageChangeEvent($event: PageEvent): void {
    this.onPageChange.emit($event)
    this.savePagination($event.pageSize)
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    this.selectedRows.emit(this.selection.selected)
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  sortData(sort: Sort): void {
    const data = this.baseTable.dataSource.slice();

    this.baseTable.dataSource = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';

      return this.compare(a[sort.active], b[sort.active], isAsc);
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  setColumnCheckboxList(): void {
    this.checkboxListMenuInput = {
      ...this.checkboxListMenuInput,
      checkboxList: this.baseTable.columns.map((column: IColumns<T>) => {
        return {
          checked: column.show,
          disabled: false,
          label: column.caption,
          onChange: (event: MatCheckboxChange) => {
            let findColumn = this.baseTable.columns.find((result: IColumns<T>) => result.field.key === column.field.key) as IColumns<T>
            findColumn.show = event.checked
            this.updateColumn(findColumn)
          }
        }
      })
        //Remove select column from the list
        .filter((column: any) => column.label !== 'select')
    }
  }

  setDisplayedColumns(): void {
    const columns = this.baseTable.columns.map((baseTable: IColumns<T>) => baseTable.caption)

    // Filter the columns that are not shown
    this.displayedColumns = columns.filter((column: string) => {
      return this.baseTable.columns.find((result: IColumns<T>) => result.caption === column)?.show
    })

    // If the table has actions, push the actions column
    if (this.showActions && this.baseTable.actions) {
      this.pushActionColumn()
    }

    if (this.tableKey()) {
      this.saveStorageColumns()
    }
  }

  updateColumn(column: IColumns<T>): void {
    this.baseTable = {
      ...this.baseTable,
      columns: this.baseTable.columns.map((result: IColumns<T>) => {
        if (result.field.key === column.field.key) {
          return column
        }
        return result
      })
    }
    this.setDisplayedColumns()
  }

  tableKey(): string {
    return this.baseTable.storeKey || ''
  }

  storageColumns(): IColumns<T>[] {
    return this.storageService.getItem(this.tableKey())?.columns as any
  }

  displayedStorageColumns(): string[] {
    return this.storageService.getItem(this.tableKey())?.displayedColumns
  }

  saveStorageColumns(): void {
    this.storageService.setItem(this.tableKey(), {
      columns: this.baseTable.columns as any,
      displayedColumns: this.displayedColumns,
    })
  }

  savePagination(pageSize: number): void {
    this.paginationStorageService.setItem(this.tableKey() + '-paginate', pageSize)
  }

  getPagination(): number {
    return this.paginationStorageService.getItem(this.tableKey() + '-paginate')
  }

  hasOneLeft(): boolean {
    return this.displayedColumns.length <= 2
  }

  drop(event: CdkDragDrop<string>) {
    const previousIndex = this._dataSource.data.findIndex(d => d === event.item.data);
    moveItemInArray(this._dataSource.data, previousIndex, event.currentIndex);
    this.baseTable.dataSource = this._dataSource.data as T[]
    this.onDragChange.emit(this.baseTable.dataSource)
    this.table.renderRows();
  }
}
