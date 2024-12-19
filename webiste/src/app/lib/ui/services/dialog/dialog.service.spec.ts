import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog"
import { DialogService } from "./dialog.service"
import { TestBed } from "@angular/core/testing"
import { of } from 'rxjs';

@Component({
  selector: 'app-mock-dialog-component',
  standalone: true,
  template: '<p>Mock Dialog Component</p>',
})
export class MockDialogcomponent { }

describe('DialogService', () => {
  let service: DialogService
  let dialogSpy: jasmine.SpyObj<MatDialog>
  let dialogSpyRef: jasmine.SpyObj<MatDialogRef<MockDialogcomponent>>

  let component = MockDialogcomponent

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatDialog', ['open', 'closeAll'])
    const spyRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed'])

    TestBed.configureTestingModule({
      imports: [MockDialogcomponent],
      providers: [
        DialogService,
        { provide: MatDialog, useValue: spy }
      ]
    })

    service = TestBed.inject(DialogService)
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>
    dialogSpyRef = spyRef
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should call dialog open method', () => {
    const componentToOpen = component
    service.open(componentToOpen, {})
    expect(dialogSpy.open).toHaveBeenCalledWith(componentToOpen, {})
  })

  it('should call dialog open method with reference', () => {
    const componentToOpen = component
    const config = {} as MatDialogConfig
    const dialogRef = {} as MatDialogRef<MockDialogcomponent>

    dialogSpy.open.and.returnValue(dialogRef as MatDialogRef<MockDialogcomponent>)

    const ref = service.openWithRef(componentToOpen, config)

    expect(dialogSpy.open).toHaveBeenCalledWith(componentToOpen, config)
    expect(ref).toBe(dialogRef)
  })

  it('should call dialog open method with callback', () => {
    const config: MatDialogConfig = {};

    dialogSpy.open.and.returnValue(dialogSpyRef);
    dialogSpyRef.afterClosed.and.returnValue(of(undefined));

    const callbackSpy = jasmine.createSpy('callback');
    service.openDialogWithCallback(component, config, callbackSpy);

    expect(dialogSpy.open).toHaveBeenCalledWith(component, config);
    expect(dialogSpyRef.afterClosed).toHaveBeenCalled();
    expect(callbackSpy).toHaveBeenCalled();
  })
})
