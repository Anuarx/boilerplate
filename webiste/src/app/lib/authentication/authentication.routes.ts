import { Route } from "@angular/router";
import { LoginFormContainerComponent } from "./components/login-form-container/login-form-container.component";

export const authenticationRoutes: Route[] = [
  {
    path: 'login',
    component: LoginFormContainerComponent,
  }
]
