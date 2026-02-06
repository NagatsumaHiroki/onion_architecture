export interface ApiErrorHandler {
  getMessage(response: Response, fallback: string): string;
}

export const defaultApiErrorHandler: ApiErrorHandler = {
  getMessage(response, fallback) {
    if (response.status === 400) {
      return '入力内容に問題があります';
    }
    if (response.status === 404) {
      return '対象が見つかりません';
    }
    if (response.status >= 500) {
      return fallback;
    }
    return fallback;
  },
};
