import { ApiState } from "../../../../../shared";
import { CurrentUserResponseDto } from "./current-user.dto";
import { CurrentUserService } from "./current-user.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class CurrentUserStateService implements ApiState<CurrentUserResponseDto> {
  readonly state = this.currentUserService.stateSignal

  constructor(
    private currentUserService: CurrentUserService,
  ) { }

  /**
   * @returns { void }
   * @description Fetch current user
   */
  dispatch(): void {
    this.currentUserService.dispatch()
  }

  userById(): any {
    return this.state().data
  }

  /**
   * @returns { void }
   * @description Reset current user state
   */
  reset(): void {
    this.currentUserService.resetState()
  }
}
