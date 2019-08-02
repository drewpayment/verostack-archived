
export interface ServerError {
  error: string,
  hint: string,
  message: string
}

export interface HttpRequest {
  lazyInit: any,
  lazyUpdate: any,
  normalizedNames: any
}

export interface HttpErrorResponse {
  error: ServerError,
  headers: HttpRequest,
  message: string,
  name: string,
  ok: boolean,
  status: number,
  statusText: string,
  url: string
}

export interface PasswordResetError {
    errors: {
        username: string[],
        password: string[]
    },
    message: string
}
