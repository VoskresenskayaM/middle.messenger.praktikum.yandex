import { Block } from '../../../utils/Block';
import { source } from './source';

type hendle=(event: Event) => void;
interface Props {
  attr: Record<string, string>,
  events: Record<string, hendle>
}

export default class ChatSendForm extends Block {
  constructor(props:Props) {
    super('form', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
