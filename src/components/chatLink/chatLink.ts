import { Block } from '../../utils/Block';
import { source } from './source';

type hendle=(event: Event) => void;
interface Props {
  attr: Record<string, string>,
  events: Record<string, hendle>
}

export default class ChatLink extends Block {
  constructor(props:Props) {
    super('div', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
