import { Injectable, WritableSignal, signal } from "@angular/core";
import { CurrentUserResponseDto } from "./current-user.dto";
import { HttpClient } from "@angular/common/http";
import { catchError, finalize, take, tap, throwError } from "rxjs";
import { environment } from "../../../../../../../environments/environment";
import { ApiModel, State } from "../../../../../shared";

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService implements ApiModel<CurrentUserResponseDto> {
  readonly stateSignal: WritableSignal<State<CurrentUserResponseDto>> = signal<State<CurrentUserResponseDto>>({
    isLoading: false,
    data: {} as CurrentUserResponseDto,
    error: null,
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

  private set data(data: CurrentUserResponseDto) {
    this.stateSignal.set({
      ...this.stateSignal(), data
    });
  }

  get data(): CurrentUserResponseDto {
    return this.stateSignal().data;
  }

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Fetch current user
   * @type GET
   */
  dispatch(): void {
    this.isLoading = true;
    this.error = null
    this.data = {} as CurrentUserResponseDto;

    this.http.get<CurrentUserResponseDto>(`${environment.apiUrl}/authentication/current-user`)
      .pipe(
        take(1),
        tap((data: any) => {
          this.data = data.data as unknown as any;
        }),
        catchError((err) => {
          this.error = Error(err.message || 'Failet to get current user');
          return throwError(() => { return err })
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe();
  }

  /**
   * Reset current user state
   */
  resetState(): void {
    this.stateSignal.set({
      isLoading: false,
      data: {} as CurrentUserResponseDto,
      error: null,
    });
  }
}
