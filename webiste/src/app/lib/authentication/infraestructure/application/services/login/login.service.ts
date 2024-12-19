import { Injectable, WritableSignal, signal } from "@angular/core";
import { LoginPayloadDto, LoginResponseDto } from "./login.dto";
import { HttpClient } from "@angular/common/http";
import { catchError, finalize, take, tap, throwError } from "rxjs";
import { ApiModel, State } from "../../../../../shared";
import { environment } from "../../../../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class LoginService implements ApiModel<LoginResponseDto, LoginPayloadDto> {
  readonly stateSignal: WritableSignal<State<LoginResponseDto>> = signal<State<LoginResponseDto>>({
    isLoading: false,
    data: {} as LoginResponseDto,
    error: null,
    params: null,
  });

  private set isLoading(isLoading: boolean) {
    this.stateSignal.set({ ...this.stateSignal(), isLoading });
  }

  get isLoading(): boolean {
    return this.stateSignal().isLoading;
  }

  private set error(error: Error | any | null) {
    this.stateSignal.set({ ...this.stateSignal(), error });
  }

  get error(): Error | any | null {
    return this.stateSignal().error
  }

  private set data(data: LoginResponseDto) {
    this.stateSignal.set({
      ...this.stateSignal(), data
    });
  }

  get data(): LoginResponseDto {
    return this.stateSignal().data;
  }

  private set params(params: LoginPayloadDto) {
    this.stateSignal.set({ ...this.stateSignal(), params });
  }

  get params(): LoginPayloadDto {
    return this.stateSignal()['params'];
  }

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Fetch login request
   * @param data LoginPayloadDto
   * @type POST
   * @returns void
  */
  dispatch(data: LoginPayloadDto): void {
    this.isLoading = true;
    this.error = null
    this.params = data
    this.data = {} as LoginResponseDto

    this.http.post<LoginResponseDto>(`${environment.apiUrl}api/token-auth/`, data)
      .pipe(
        take(1),
        tap((response) => {
          this.data = response
          this.error = null
        }),
        catchError((err) => {
          this.data = {} as LoginResponseDto
          this.error = new Error(err.message || 'Failed to login')
          return throwError(() => { return err })
        }),
        finalize(() => this.isLoading = false),
      ).subscribe()
  }

  /**
   * Reset state
   * @returns void
  */
  resetState(): void {
    this.data = {} as LoginResponseDto
    this.error = null
    this.isLoading = false
  }
}
