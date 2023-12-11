import '../../css/style.scss';
import { Block } from '../../utils/Block';
import { source } from './source.ts';

interface PropsPage404 {
  attr: Record<string, string>,
  error: string,
  message: string,
  link: string
}

const props : PropsPage404 = {
  error: '404',
  message: 'Не туда попали',
  link: '/src/pages/chats/chats.html',
  attr: {
    class: 'page404__block',
  },
}

export class Page404 extends Block {
  constructor() {
    super('main', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
