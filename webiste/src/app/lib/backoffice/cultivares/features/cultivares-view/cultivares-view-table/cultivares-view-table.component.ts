import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { BaseTableComponent, DialogService, IBaseTable } from '../../../../../ui';
import { CommonModule } from '@angular/common';
import { CultivaresViewTableInput, cultivarViewTableColumns } from './cultivares-view-table.interface';
import { Cultivar } from '../../../interfaces/cultivares.interfaces';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cultivares-view-table',
  imports: [BaseTableComponent, CommonModule],
  templateUrl: './cultivares-view-table.component.html',
  styleUrl: './cultivares-view-table.component.scss'
})
export class CultivaresViewTableComponent {
  cultivaresViewTableComponent = input.required<CultivaresViewTableInput>();

  @Output() onDeleteCultivarEvent: EventEmitter<Cultivar> = new EventEmitter<Cultivar>();

  @Output() onPageChangeEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  baseTableInput: IBaseTable<Cultivar> = {
    dataSource: [],
    columns: cultivarViewTableColumns,
    paginateOptions: {
      page: 0,
      pageSize: 10,
      totalCount: 0,
      pageSizeOptions: [10, 15, 20, 25, 50, 100]
    },
    actions: [
      {
        name: 'Borrar',
        icon: 'trash',
        action: (cultivar: Cultivar) => {
          this.dynamicDialogService.confirmationDialog({
            data: {
              title: 'Confirmar eliminación',
              message: '¿Está seguro de que desea eliminar este cultivar?',
              confirmButtonText: 'Sí',
              cancelButtonText: 'No',
            },
            callback: () => {
              this.onDeleteCultivarEvent.emit(cultivar);
            },
            onCancel: () => { }
          });
        },
        hide: (cultivar: Cultivar) => false,
      },
    ]
  }

 cultivarViewTableComponentEffect = effect(() => {
    this.baseTableInput = {
      ...this.baseTableInput,
      dataSource: this.cultivaresViewTableComponent().cultivares,
      paginateOptions: {
        ...this.baseTableInput.paginateOptions,
        totalCount: this.cultivaresViewTableComponent().totalCount
      }
    }
  })

  constructor(
    private dynamicDialogService: DialogService,
  ) { }

  onPageChange($event: PageEvent): void {
    this.baseTableInput = {
      ...this.baseTableInput,
      paginateOptions: {
        ...this.baseTableInput.paginateOptions,
        page: $event.pageIndex,
        pageSize: $event.pageSize
      }
    };
  
    this.onPageChangeEvent.emit({
      pageIndex: $event.pageIndex,
      pageSize: $event.pageSize,
      length: $event.length,
      previousPageIndex: $event.previousPageIndex 
    });
  }  
}
