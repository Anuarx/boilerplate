export interface LoginPayloadDto {
    email: string
    password: string
  }
  
  export interface LoginResponseDto {
    id: string,
    email: string,
    role: string,
    token: string,
  }
  