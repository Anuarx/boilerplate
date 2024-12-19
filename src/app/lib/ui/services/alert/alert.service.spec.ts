import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        AlertService,
        { provide: MatSnackBar, useValue: spy }
      ]
    });

    service = TestBed.inject(AlertService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call snackBar open method with error panelClass', () => {
    const message = 'Error message';
    service.error(message);
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'OK', jasmine.objectContaining({ panelClass: 'app-snack-error' }));
  });

  it('should call snackBar open method with success panelClass', () => {
    const message = 'Success message';
    service.success(message);
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'OK', jasmine.objectContaining({ panelClass: 'app-snack-success' }));
  });

  it('should call snackBar open method with info panelClass', () => {
    const message = 'Info message';
    service.info(message);
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'OK', jasmine.objectContaining({ panelClass: 'app-snack-info' }));
  });
});
