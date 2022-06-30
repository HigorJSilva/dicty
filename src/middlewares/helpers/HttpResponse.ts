export interface HttpResponse {
  status: boolean
  message: String | null
  data: any[] | Object | null
  errors: any[] | null
}

export const ApiResponse = (status: boolean, message: string| null, data: any[] | Object | null, errors: any[] | null): HttpResponse => ({
  status: status,
  message: message ?? null,
  data: data ?? null,
  errors: errors ?? null
})
