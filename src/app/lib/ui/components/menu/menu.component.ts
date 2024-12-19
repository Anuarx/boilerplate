import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ButtonComponent } from '../button/button.component';
import { ITableActions } from '../../interfaces/base-table.interface';

@Component({
  selector: 'ui-menu',
  standalone: true,
  imports: [MatMenuModule, CommonModule, IconButtonComponent, ButtonComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {
  @Input() icon: string = 'more_horiz'
  @Input() actions: ITableActions<any>[] = []
}
