interface APIResponseProps<T extends Record<string, any> = never> {
  error: boolean;
  data: T;
  message?: string;
}

export type { APIResponseProps };
