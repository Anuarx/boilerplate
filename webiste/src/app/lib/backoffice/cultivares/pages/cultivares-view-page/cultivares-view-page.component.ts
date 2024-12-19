import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CultivaresViewContainerComponent } from '../../features';
import { PageTemplateComponent } from '../../../../ui';

@Component({
  selector: 'app-cultivares-view-page',
  imports: [CommonModule, CultivaresViewContainerComponent, PageTemplateComponent],
  templateUrl: './cultivares-view-page.component.html',
  styleUrl: './cultivares-view-page.component.scss'
})
export class CultivaresViewPageComponent {

}
