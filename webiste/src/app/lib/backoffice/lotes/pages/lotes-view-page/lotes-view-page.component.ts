import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LotesFilterComponent } from '../../features/lotes-view/lotes-filter/lotes-filter.component';
import { LotesViewContainerComponent } from '../../features/lotes-view/lotes-view-container/lotes-view-container.component';
import { PageTemplateComponent } from '../../../../ui';

@Component({
  selector: 'app-lotes-view-page',
  imports: [CommonModule, LotesFilterComponent, LotesViewContainerComponent, PageTemplateComponent],
  templateUrl: './lotes-view-page.component.html',
  styleUrl: './lotes-view-page.component.scss'
})
export class LotesViewPageComponent {

}
