import { Block } from '../../../utils/Block';
import { source } from './source';

type buttonHendle=(event: Event) => void;

interface Props {
  attr: Record<string, string>,
  events: Record<string, buttonHendle>
}

export class ChatFormButton extends Block {
  constructor(props:Props) {
    super('form', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
