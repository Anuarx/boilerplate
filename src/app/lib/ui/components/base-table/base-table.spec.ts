import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { BaseTableComponent } from "./base-table.component"
import { StorageService } from "@shared/storage"
import { BaseTableStorage } from './table.interface';
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatCheckboxChange, MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from "@angular/material/paginator";
import { CommonModule } from "@angular/common";
import { MenuComponent } from "../menu/menu.component";
import { CheckboxListMenuComponent } from "../checkbox-list-menu/checkbox-list-menu.component";
import { IBaseTable, IColumns } from "../../interfaces/base-table.interface";
import { CheckListMenuInput } from "../checkbox-list-menu/checkbox-list-menu.interface";

describe('BaseTableComponent', <T>() => {
  let storageService: StorageService<BaseTableStorage<T>> = new StorageService<BaseTableStorage<T>>()
  let paginationStorageService: StorageService<number> = new StorageService<number>()
  let component: BaseTableComponent<T> = new BaseTableComponent<T>(storageService, paginationStorageService)
  let fixture: ComponentFixture<BaseTableComponent<T>>

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [BaseTableComponent, MatCardModule, MatTableModule, MatSortModule, MatCheckboxModule, CommonModule, MatPaginatorModule, MenuComponent, CheckboxListMenuComponent],
      providers: [StorageService<BaseTableStorage<T>>]
    }).compileComponents()

    fixture = TestBed.createComponent(BaseTableComponent<T>)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeDefined()
  })

  it('should initialized', () => {
    expect(component.initial).toBeTrue()
    expect(component.selectAll).toBeFalse()
    expect(component.baseTable.storeKey).toEqual('' || undefined)
  })

  it('should initialize without storageKey', () => {
    component.baseTable = baseTable as IBaseTable<User> as any

    const setDisplayedColumnsSpy = spyOn(component, 'setDisplayedColumns').and.callThrough()

    component.ngOnInit()
    expect(setDisplayedColumnsSpy).toHaveBeenCalled()

    const columns = component.baseTable.columns.map((baseTable: IColumns<T>) => baseTable.caption)
    const displayedColumns = columns.filter((column: string) => {
      return component.baseTable.columns.find((result: IColumns<T>) => result.caption === column)?.show
    })
    expect(component.displayedColumns).toEqual(displayedColumns)

    const storageColumns = component.displayedStorageColumns()
    expect(storageColumns).toBeUndefined()
  })

  it('should initialize with storageKey', () => {
    component.baseTable = {
      ...baseTableWithKey,
      storeKey: 'test'
    } as IBaseTable<User> as any

    const storageMock: {
      columns: IColumns<any>[],
      displayedColumns: string[]
    } = { "columns": [{ "caption": "Name", "field": { "key": "name" }, "show": true }, { "caption": "Email", "field": { "key": "email" }, "show": true }, { "caption": "Phone", "field": { "key": "phone" }, "show": true }], "displayedColumns": ["actions"] }

    localStorage.setItem('test', JSON.stringify(storageMock))

    const setDisplayedColumnsSpy = spyOn(component, 'setDisplayedColumns').and.callThrough()
    const storageColumnsSpy = spyOn(component, 'storageColumns').and.callThrough()
    const displayedStorageColumnsSpy = spyOn(component, 'displayedStorageColumns').and.callThrough()

    expect(component.baseTable.storeKey).toEqual('test')

    component.ngOnInit()

    expect(storageColumnsSpy).toHaveBeenCalled()
    expect(component.storageColumns()).toEqual(storageMock.columns)
    expect(component.displayedColumns).toEqual(storageMock.displayedColumns)
    expect(displayedStorageColumnsSpy).toHaveBeenCalled()
    expect(setDisplayedColumnsSpy).not.toHaveBeenCalled()

    expect(component.displayedColumns).toEqual(storageMock.displayedColumns)

    const storageColumns = component.displayedStorageColumns()
    expect(storageColumns).toBeDefined()
  })

  it('should have actions', () => {
    component.baseTable = baseTableActions as IBaseTable<User> as any

    component.ngOnInit()

    expect(component.showActions).toBeTrue()
    expect(component.displayedColumns).toContain('actions')
  })

  it('should not have actions', () => {
    component.baseTable = baseTable as IBaseTable<User> as any
    component.showActions = false

    component.ngOnInit()

    expect(component.showActions).toBeFalse()
    expect(component.displayedColumns).not.toContain('actions')
  })

  it('should set column checkbox list', () => {
    const setColumnCheckboxListSpy = spyOn(component, 'setColumnCheckboxList').and.callThrough()
    const mockEvent = { checked: true } as MatCheckboxChange;

    let checkboxListInputMock: CheckListMenuInput = checkboxListInputMockData

    component.baseTable = baseTable as IBaseTable<User> as any

    component.ngOnInit()
    expect(setColumnCheckboxListSpy).toHaveBeenCalled()

    for (let i = 0; i < component.checkboxListMenuInput.checkboxList.length; i++) {
      const element = component.checkboxListMenuInput.checkboxList[i];

      element.onChange(mockEvent)

      expect(element.checked).toEqual(true)
      expect(element.label).toEqual(checkboxListInputMock.checkboxList[i].label)
      expect(element.disabled).toBeFalse()
    }
  })

  it('should set dataSource from baseTable', () => {
    const tableMockData = mockData
    component.baseTable = baseTable as IBaseTable<User> as any

    component.ngOnInit()

    expect(component._dataSource.data).toEqual(tableMockData as User[] as any)
  })

  it('should update column show property when updateColumn is called', () => {
    const column = { caption: 'ID', field: { key: 'id' }, show: true };
    component.baseTable.columns = [column];
    component.updateColumn({ ...column, show: false });
    expect(component.baseTable.columns[0].show).toBeFalse();
  });
})

interface User {
  id: number
  name: string
  email: string
  phone: string
}

const mockData: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'jon@gmail.com',
    phone: '123456789',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'jon@gmail.com',
    phone: '123456789',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'jon@gmail.com',
    phone: '123456789',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'jon@gmail.com',
    phone: '123456789',
  }
]

const baseTable: IBaseTable<User> = {
  dataSource: mockData,
  columns: [
    {
      caption: 'Name',
      field: {
        key: 'name'
      },
      show: true,
    },
    {
      caption: 'Email',
      field: {
        key: 'email'
      },
      show: true,
    },
    {
      caption: 'Phone',
      field: {
        key: 'phone',
      },
      show: true
    }
  ]
}

const baseTableWithKey: IBaseTable<User> = {
  dataSource: mockData,
  storeKey: 'test',
  columns: [
    {
      caption: 'Name',
      field: {
        key: 'name'
      },
      show: true,
    },
    {
      caption: 'Email',
      field: {
        key: 'email'
      },
      show: true,
    },
    {
      caption: 'Phone',
      field: {
        key: 'phone',
      },
      show: true
    }
  ]
}

const baseTableActions: IBaseTable<User> = {
  dataSource: mockData,
  actions: [
    {
      icon: 'edit',
      name: 'Edit',
      action: () => { },
      hide: () => { return false }
    }
  ],
  columns: [
    {
      caption: 'Name',
      field: {
        key: 'name'
      },
      show: true,
    },
    {
      caption: 'Email',
      field: {
        key: 'email'
      },
      show: true,
    },
    {
      caption: 'Phone',
      field: {
        key: 'phone',
      },
      show: true
    }
  ]
}

export const checkboxListInputMockData: CheckListMenuInput = {
  menu: {
    overlayButtonInput: {
      icon: 'more_vert',
      color: 'primary',
      isOpen: false,
      isLoading: false,
      text: '',
      menuStyle: false,
    },
  },
  checkboxList: [
    {
      checked: false,
      label: 'Name',
      disabled: false,
      onChange: () => { },
    },
    {
      checked: false,
      label: 'Email',
      disabled: false,
      onChange: () => { },
    },
    {
      checked: false,
      label: 'Phone',
      disabled: false,
      onChange: () => { },
    }
  ]
}
