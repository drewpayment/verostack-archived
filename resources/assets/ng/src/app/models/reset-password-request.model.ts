

interface ResetPasswordRequest {
    email: string,
    password: string,
    password_confirmation: string,
    token: string
}

interface ResetPasswordResult {
    data:any
}
