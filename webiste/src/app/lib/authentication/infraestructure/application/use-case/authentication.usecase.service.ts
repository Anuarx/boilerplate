import { Injectable } from "@angular/core";
import { LoginStateService } from "../services/login/login.state.service";
import { CurrentUserStateService } from "../services/current-user/current-user.state.service";
import { AuthenticationInputUseCase } from "../../ports/input";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationUsecaseService implements AuthenticationInputUseCase {
  constructor(
    private loginStateService: LoginStateService,
    private currentUserStateService: CurrentUserStateService,
  ) { }

  loginState: LoginStateService = this.loginStateService;
  currentUserState: CurrentUserStateService = this.currentUserStateService;
}
