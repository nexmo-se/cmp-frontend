export class HTTPError extends Error {
  info?: Record<string, any> | string;
  status?: number;
}