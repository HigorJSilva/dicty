export interface RegisterUserRequest extends Request {
  username: string
  email: string
  password: string
  role: string
}
