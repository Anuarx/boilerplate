import { CurrentUserStateService } from "../../application/services/current-user/current-user.state.service";
import { LoginStateService } from "../../application/services/login/login.state.service";

export interface AuthenticationInputUseCase {
  loginState: LoginStateService
  currentUserState: CurrentUserStateService
}
