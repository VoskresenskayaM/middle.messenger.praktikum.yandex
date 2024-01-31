import { WSTransport, WSTEvents } from './Socket';
import { store } from './Store';

export class ChatWS extends WSTransport {
  constructor(url: string) {
    super(url);

    this.on(WSTEvents.Message, this.handleWSMessages.bind(this));
  }

  public getOldMessages(offset: string): void {
    this.send({ type: 'get old', content: offset });
  }

  public sendMessage(message: string): void {
    this.send({ type: 'message', content: message });
  }

  private handleWSMessages(data: any) {
    if (!data.type) store.set('messages', data.reverse());
    if (data.type === 'message') this.getOldMessages('0');
  }
}
