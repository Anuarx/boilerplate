import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { ButtonComponent } from "../button/button.component";
import { IconButtonComponent } from "../icon-button/icon-button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-template',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIcon, ButtonComponent, IconButtonComponent],
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss']
})
export class PageTemplateComponent {
  @Input() title: string = ''
  @Input() icon: string = 'dashboard'
  @Input() headerTitle: string = '';
  @Output() back = new EventEmitter<void>(); 
  @Input() backRoute: string | null = null; 



  constructor(private router: Router) {}



  onBack(): void {
    this.router.navigate([this.backRoute]);
  }

  @Input() filters: boolean = false
  @Input() actions: boolean = true
}
