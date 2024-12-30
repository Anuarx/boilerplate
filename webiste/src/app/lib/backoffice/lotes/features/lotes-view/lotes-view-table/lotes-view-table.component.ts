import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { CultivaresViewTableInput } from '../../../../cultivares';
import { Cultivar } from '../../../../cultivares/interfaces/cultivares.interfaces';
import { BaseTableComponent, DialogService, IBaseTable } from '../../../../../ui';
import { PageEvent } from '@angular/material/paginator';
import { LoteesViewTableInput, lotesViewTableColumns } from './lotes-view-table.interface';
import { CommonModule } from '@angular/common';
import { Lote } from '../../../interfaces/lote.interface';

@Component({
  selector: 'app-lotes-view-table',
  imports: [CommonModule, BaseTableComponent],
  templateUrl: './lotes-view-table.component.html',
  styleUrl: './lotes-view-table.component.scss'
})
export class LotesViewTableComponent {
cultivaresViewTableComponent = input.required<LoteesViewTableInput>();

  @Output() onDeleteCultivarEvent: EventEmitter<Cultivar> = new EventEmitter<Cultivar>();

  @Output() onPageChangeEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  baseTableInput: IBaseTable<Lote> = {
    dataSource: [],
    columns: lotesViewTableColumns,
    paginateOptions: {
      page: 0,
      pageSize: 10,
      totalCount: 0,
      pageSizeOptions: [10, 15, 20, 25, 50, 100]
    },
    actions: [
      {
        name: 'Ver QR',
        icon: 'link',
        action: (cultivar: Lote) => {
         
        },
        hide: (cultivar: Lote) => false,
      },
    ]
  }

 cultivarViewTableComponentEffect = effect(() => {
    this.baseTableInput = {
      ...this.baseTableInput,
      dataSource: this.cultivaresViewTableComponent().lotes,
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
