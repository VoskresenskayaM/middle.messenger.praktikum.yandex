import Block from '../../utils/Block';

  interface Props {
    attr: Record<string, string>,
    items: Block[]
  }
export default class ChatsArr extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile('{{{items}}}', this._props);
  }
}
