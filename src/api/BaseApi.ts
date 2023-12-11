import { HTTPTransport } from '../utils/HttpTransport';

export abstract class BaseApi {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(id?: number| string): Promise<unknown>;

  public abstract update?(data: unknown, id?: number | string): Promise<unknown>;

  public abstract delete?(id?: number| string): Promise<unknown>;
}
