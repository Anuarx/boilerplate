import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CultivaresFilterComponent, CultivaresViewContainerComponent } from '../../features';
import { PageTemplateComponent } from '../../../../ui';

@Component({
  selector: 'app-cultivares-view-page',
  imports: [CommonModule, CultivaresViewContainerComponent, PageTemplateComponent, CultivaresFilterComponent],
  templateUrl: './cultivares-view-page.component.html',
  styleUrl: './cultivares-view-page.component.scss'
})
export class CultivaresViewPageComponent {

}
