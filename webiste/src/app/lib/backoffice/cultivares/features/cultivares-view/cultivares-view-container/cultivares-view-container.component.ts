import { Component, effect } from '@angular/core';
import { CultivaresViewTableInput } from '../cultivares-view-table/cultivares-view-table.interface';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { CultivaresViewTableComponent } from '../cultivares-view-table/cultivares-view-table.component';
import { ButtonComponent } from '../../../../../ui';
import { Cultivar } from '../../../interfaces/cultivares.interfaces';

@Component({
  selector: 'app-cultivares-view-container',
  imports: [CommonModule, CultivaresViewTableComponent, ButtonComponent],
  templateUrl: './cultivares-view-container.component.html',
  styleUrl: './cultivares-view-container.component.scss'
})
export class CultivaresViewContainerComponent {
  
  cultivarTableInput: CultivaresViewTableInput = {
    cultivares: [
      {
        id: '1',
        densidadSiembra: '10 kg/ha',
        cicloFloracion: '90 días',
        habito: 'Erecto',
        usosSugeridos: 3,
      },
      {
        id: '2',
        densidadSiembra: '12 kg/ha',
        cicloFloracion: '75 días',
        habito: 'Postrado',
        usosSugeridos: 2,
      },
      {
        id: '3',
        densidadSiembra: '15 kg/ha',
        cicloFloracion: '100 días',
        habito: 'Semi-erecto',
        usosSugeridos: 4,
      },
      {
        id: '4',
        densidadSiembra: '8 kg/ha',
        cicloFloracion: '85 días',
        habito: 'Compacto',
        usosSugeridos: 1,
      },
      {
        id: '5',
        densidadSiembra: '20 kg/ha',
        cicloFloracion: '110 días',
        habito: 'Rastrero',
        usosSugeridos: 5,
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
