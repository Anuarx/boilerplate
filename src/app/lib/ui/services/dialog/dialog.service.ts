import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable, take, tap } from 'rxjs';
import { IFileLoaderDialogOptions } from '../../interfaces';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { FileLoaderDialogComponent } from '../../components/file-loader-dialog/file-loader-dialog.component';
import { IConfirmationDialogOptions, IConfirmationDialogOptionsV2 } from '../../interfaces';
import { DeleteConfirmationDialogComponent } from '../../components';
import { ConfirmationDialogV2Component } from '../../components/confirmation-dialog-v2/confirmation-dialog-v2.component';
import { SuccessDialogComponent } from '../../components/success-dialog/success-dialog.component';
import { SuccessDialogV2Component } from '../../components/success-dialog-v2/success-dialog-v2.component';

/*
Usage example confirmation dialog

onClick(): void {
  this.dialog.openConfirmationDialog({
    title: 'Confirm',
    message: 'Are you sure?'
  }, this.callBack)
}

If user is sure, => callback()

callBack(): void {
  ...put your callback flow
}
*/

@Injectable({
  providedIn: 'root'
})

export class DialogService {

  constructor(
    private dialog: MatDialog,
  ) { }

  public open<T, D>(component: ComponentType<T>, config?: MatDialogConfig<D>): void {
    this.dialog.open(component, config)
  }

  public openWithRef<T, D, R>(component: ComponentType<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R> {
    return this.dialog.open(component, config)
  }

  public openDialogWithCallback<T, D>(component: ComponentType<T>, config: MatDialogConfig<D> = {}, callBack: () => void): void {
    const ref = this.openWithRef(component, config)

    ref.afterClosed()
      .pipe(
        take(1),
        tap(() => {
          callBack()
        })
      ).subscribe()
  }

  public confirmationDialog(options: IConfirmationDialogOptions): void {
    const ref = this.openWithRef(ConfirmationDialogComponent, {
      data: {
        title: options.data.title,
        message: options.data.message,
        confirmButtonText: options.data.confirmButtonText,
        cancelButtonText: options.data.cancelButtonText
      },
      width: '450px',
      disableClose: true
    })

    this.manageRefState(ref, options).subscribe()
  }

  public deleteConfirmationDialog(options: IConfirmationDialogOptions): void {
    const ref = this.openWithRef(DeleteConfirmationDialogComponent, {
      data: {
        title: options.data.title,
        message: options.data.message,
        confirmButtonText: options.data.confirmButtonText,
        cancelButtonText: options.data.cancelButtonText
      },
      width: '450px',
      disableClose: true
    })

    this.manageRefState(ref, options).subscribe()
  }

  public confirmationDialogV2(options: IConfirmationDialogOptionsV2): void {
    const ref = this.openWithRef(ConfirmationDialogV2Component, {
      data: {
        title: options.data.title,
        mainMessage: options.data.mainMessage,
        subMessage: options.data.subMessage,
        confirmButtonText: options.data.confirmButtonText,
        cancelButtonText: options.data.cancelButtonText,
        svg: options.data.svg,
        infoMessage: options.data.infoMessage,
      },
      width: options.width || '450px',
      disableClose: true
    })

    this.manageRefState(ref, options).subscribe()
  }

  public successDialogV2(options: IConfirmationDialogOptionsV2): void {
    const ref = this.openWithRef(SuccessDialogV2Component, {
      data: {
        title: options.data.title,
        mainMessage: options.data.mainMessage,
        subMessage: options.data.subMessage,
        confirmButtonText: options.data.confirmButtonText,
        cancelButtonText: options.data.cancelButtonText,
        svg: options.data.svg,
        infoMessage: options.data.infoMessage,
      },
      width: options.width || '450px',
      disableClose: true
    })

    this.manageRefState(ref, options).subscribe()
  }

  public successDialog(options: IConfirmationDialogOptions): void {
    const ref = this.openWithRef(SuccessDialogComponent, {
      data: {
        title: options.data.title,
        message: options.data.message,
        confirmButtonText: options.data.confirmButtonText,
        cancelButtonText: options.data.cancelButtonText
      },
      width: '450px',
      disableClose: true
    })

    this.manageRefState(ref, options).subscribe()
  }

  // public openSessionExpireModal(options: ISessionExpiresModal): void {
  //   const ref = this.openWithRef(SessionExpiredComponent, {
  //     data: {
  //       title: options.data.title,
  //       message: options.data.message,
  //       confirmButtonText: options.data.confirmButtonText,
  //       cancelButtonText: options.data.cancelButtonText,
  //     },
  //     width: '450px',
  //     disableClose: true
  //   })

  //   this.manageRefState(ref, options).subscribe()
  // }


  public fileLoaderDialog(data: IFileLoaderDialogOptions): void {
    this.open(FileLoaderDialogComponent, {
      data: data,
      disableClose: true
    })
  }

  public closeAll() {
    this.dialog.closeAll()
  }

  public closeLastOpened() {
    this.dialog.closeAll()
  }

  manageRefState(ref: MatDialogRef<any>, options: any): Observable<unknown> {
    return ref.afterClosed()
      .pipe(
        take(1),
        tap((result) => {
          if (result) {
            if (options.closeAfterConfirm) {
              options.callback()
              this.closeAll()
              return
            }

            if (!options.closeAfterConfirm) {
              options.callback()
            }
          }

          if (!result) {
            if (options.onCancel) {
              options.onCancel()
            }
          }
        })
      )
  }
}
