import { Block } from '../../utils/Block';
import { ROUTES } from '../../utils/Constants';
import { router } from '../../utils/Router';
import { source } from './source';

interface Props {
  attr: Record<string, string>
}

export default class BackPanel extends Block {
  constructor(props : Props) {
    super('div', props);
  }

  init() {
    this._props.events = {
      click: (event : Event) => {
        if (event.target) router.go(ROUTES.CHAT);
      },
    };
  }

  render() {
    return this.compile(source, this._props);
  }
}
