import { Injectable } from "@angular/core";
import { LoginPayloadDto, LoginResponseDto } from "./login.dto";
import { LoginService } from "./login.service";
import { ApiState } from "../../../../../shared";

@Injectable({
  providedIn: 'root'
})
export class LoginStateService implements ApiState<LoginResponseDto, LoginPayloadDto> {
  readonly state = this.loginService.stateSignal

  constructor(
    private loginService: LoginService,
  ) { }

  /**
   * @param data - LoginPayloadDto
   * @returns { void }
   * @description dispatch login data
   */
  dispatch(data: LoginPayloadDto): void {
    this.loginService.dispatch(data)
  }

  /**
   * @returns { void }
   * @description Reset login state
   */
  reset(): void {
    this.loginService.resetState()
  }
}
