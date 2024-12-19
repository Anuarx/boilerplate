import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-page-template',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIcon],
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss']
})
export class PageTemplateComponent {
  @Input() title: string = ''
  @Input() icon: string = 'dashboard'

  @Input() filters: boolean = false
  @Input() actions: boolean = true
}
