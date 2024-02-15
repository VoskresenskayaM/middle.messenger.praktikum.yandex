import EventBus from './EventBus';
/* eslint-disable */
export enum WSTEvents {
	Error = 'error',
	Connected = 'connected',
	Close = 'close',
	Message = 'message',
}

/* eslint-enable */
export class WSTransport extends EventBus {
  private socket?: WebSocket;

  private interval?: ReturnType<typeof setInterval>;

  private readonly intervalTime = 30000;

  private readonly url: string;

  constructor(url: string) {
    super();

    this.url = url;
  }

  public send(data: string | number | object) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    if (this.socket) {
      throw new Error('Socket is already connected');
    }

    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);
    this.setupPing();

    return new Promise((resolve, reject) => {
      this.on(WSTEvents.Error, reject);
      this.on(WSTEvents.Connected, () => {
        this.off(WSTEvents.Error, reject);
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
    clearInterval(this.interval);
  }

  private setupPing() {
    this.interval = setInterval(() => {
      this.send({ type: 'ping' });
    }, this.intervalTime);

    this.on(WSTEvents.Close, () => {
      clearInterval(this.interval);
      this.interval = undefined;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSTEvents.Connected);
    });

    socket.addEventListener('close', () => {
      this.emit(WSTEvents.Close);
    });

    socket.addEventListener('error', (error: Event) => {
      this.emit(WSTEvents.Error, error);
    });

    socket.addEventListener('message', (message: MessageEvent<any>) => {
      try {
        const data = JSON.parse(message.data);

        if (['pong', 'user connected'].includes(data?.type)) {
          return;
        }

        this.emit(WSTEvents.Message, data);
      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error(error);
      }
    });
  }
}
