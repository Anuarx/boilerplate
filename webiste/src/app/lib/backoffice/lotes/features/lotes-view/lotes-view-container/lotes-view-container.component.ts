import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Cultivar } from '../../../../cultivares/interfaces/cultivares.interfaces';
import { CommonModule } from '@angular/common';
import { LotesViewTableComponent } from '../lotes-view-table/lotes-view-table.component';
import { LoteesViewTableInput } from '../lotes-view-table/lotes-view-table.interface';

@Component({
  selector: 'app-lotes-view-container',
  imports: [CommonModule, LotesViewTableComponent],
  templateUrl: './lotes-view-container.component.html',
  styleUrl: './lotes-view-container.component.scss'
})
export class LotesViewContainerComponent {
  lotesTableInput: LoteesViewTableInput = {
    lotes: [
      {
        id: '1',
        lote: 'Lote A',
        departamento: 'Canelones',
        pureza: '98%',
        germinacion: 85,
      },
      {
        id: '2',
        lote: 'Lote B',
        departamento: 'Montevideo',
        pureza: '95%',
        germinacion: 80,
      },
      {
        id: '3',
        lote: 'Lote C',
        departamento: 'Colonia',
        pureza: '92%',
        germinacion: 78,
      },
      {
        id: '4',
        lote: 'Lote D',
        departamento: 'Maldonado',
        pureza: '96%',
        germinacion: 88,
      },
      {
        id: '5',
        lote: 'Lote E',
        departamento: 'Rivera',
        pureza: '97%',
        germinacion: 90,
      },
    ],
    totalCount: 5,
    isLoading: false,
  };

  // getPaymentsEffect = effect(() => {
  //   const state = this.paymentUseCase.getPaymentsPaginated.state()

  //   this.setPaymentTableInput({
  //     payments: state.data.data || [],
  //     totalCount: state.data.totalCount || 0,
  //     isLoading: state.isLoading || false
  //   })

  //   if (this.paymentUseCase.getPaymentsPaginated.state().error) {
  //     this.alertService.showError("Error al obtener los pagos")
  //   }
  // })

  // onDeletePaymentEffect = effect(() => {
  //   this.paymentTableInput = {
  //     ...this.paymentTableInput,
  //     isLoading: this.paymentUseCase.deletePayment.state().isLoading
  //   }
  // }, { allowSignalWrites: true })

  constructor(
    // private paymentUseCase: PaymentUseCase,
    // private alertService: AlertService,
    // private dialogService: DynamicDialogService,
  ) { }

  ngOnInit(): void {
    this.getPayments()
  }

  ngOnDestroy(): void {
    // this.paymentUseCase.getPaymentsPaginated.reset()
    // this.paymentUseCase.deletePayment.reset()
  }

  getPayments(page: number = 0, pageSize: number = 10): void {
    // this.paymentUseCase.getPaymentsPaginated.dispatch({
    //   page: page,
    //   pageSize: pageSize
    // })
  }

  onPageChange($event: PageEvent): void {
    this.getPayments($event.length, $event.pageIndex)
  }

  // setPaymentTableInput(paymentTableInput: PaymentViewTableInput): void {
  //   this.paymentTableInput = {
  //     ...paymentTableInput
  //   }
  // }

   onDeletePayment($event: Cultivar): void {
    //  this.paymentUseCase.deletePayment.dispatch({ paymentId: $event.id }, () => {
    //    this.alertService.showSuccess("Pago eliminado  ")
    //    this.getPayments(0, 10)
    //  }, () => {
    //    this.alertService.showError("Error al eliminar el pago")
    //  })
   }

  // onCreatePayment(): void {
  //   this.dialogService.open(CreatePaymentContainerComponent, {
  //     header: 'Ingrese los datos del pago',
  //     duplicate: true,
  //     contentStyle: { overflow: 'auto' },
  //     width: '1000px',
  //   })
  // }
}
