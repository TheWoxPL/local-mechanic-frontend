export class CallApiResponseDTO<T> {
  readonly statusCode!: number;
  readonly path!: string;
  readonly message!: string;
  readonly data!: T;

  constructor(response: CallApiResponseDTO<T>) {
    this.statusCode = response.statusCode!;
    this.path = response.path!;
    this.message = response.message!;
    this.data = response.data!;
  }
}
