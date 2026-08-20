export interface ApiResponse<T> {
  data: T;
  status: number;
  statusMessage: string;
}
