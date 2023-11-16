type EventBusHeandle<A extends unknown = any> = (
    ...args: Partial<Array<A>>
  ) => void;

type Listeners = Record<string, Array<EventBusHeandle>>;

export interface IEventBus {
    on(event: string, callback: EventBusHeandle): void;
    off(event: string, callback: EventBusHeandle): void;
    emit(event: string, ...args: Array<unknown>): void;
  }

export default class EventBus {
  private listeners: Listeners;

  constructor() {
    this.listeners = {};
  }

  on(event:string, callback:EventBusHeandle) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event:string, callback: EventBusHeandle) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event:string, ...args:Array<unknown>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
