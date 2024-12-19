import { Component, effect, inject } from '@angular/core';
import { IComponentTitle, NavbarService } from '../../services/navbar/navbar.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule,],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  componentTitleOptions: IComponentTitle

  navbarService = inject(NavbarService)

  componentTitleSignal = toSignal(this.navbarService.componentTitle$)
  componentTitleEffect = effect(() => {
    this.componentTitleOptions = this.componentTitleSignal() as IComponentTitle
    this.parseSteps(this.componentTitleOptions.steps)
  })

  parseSteps(steps: string[]) {
    this.componentTitleOptions.steps = []

    steps.forEach((result, index) => {
      this.componentTitleOptions.steps.push(result)

      if (index != steps.length - 1) {
        this.componentTitleOptions.steps.push('>')
      }
    })
  }
}
