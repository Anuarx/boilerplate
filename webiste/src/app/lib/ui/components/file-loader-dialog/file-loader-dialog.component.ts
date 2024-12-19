import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { IFileLoaderDialogOptions } from '../../interfaces';
import { CustomSpinnerComponent } from '../custom-spinner/custom-spinner.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-file-loader-dialog',
  standalone: true,
  imports: [CommonModule, CustomSpinnerComponent, MatDialogModule, ButtonComponent],
templateUrl: './file-loader-dialog.component.html',
  styleUrls: ['./file-loader-dialog.component.scss']
})
export class FileLoaderDialogComponent implements OnInit, OnDestroy {

  isLoading: boolean = false

  loadingSubscription: Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IFileLoaderDialogOptions,
    public dialogRef: MatDialogRef<FileLoaderDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.loadingSubscription = this.data.isLoading.subscribe((result) => {
      this.isLoading = result
    })
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe()
  }
}
