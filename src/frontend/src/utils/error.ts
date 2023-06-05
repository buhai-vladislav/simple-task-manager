import { AxiosError } from 'axios';

export const getErrorMessage = (error: unknown) => {
  let message = '';
  if (error instanceof AxiosError) {
    message = Array.isArray(error?.response?.data?.message)
      ? error?.response?.data?.message[0]
      : error?.response?.data?.message;
  }
  if (typeof error === 'string') {
    message = error;
  }

  return message;
};
