// eslint-disable-next-line max-classes-per-file
import EventBus from './EventBus.ts';
import { Block } from './Block.ts';
import isEqual from './isEqual.ts';
import { Chats, ChatsUser } from '../api/ChatApi.ts';
import { ChatWS } from './ChatSocket.ts';

import {
  User, Message, Props,
} from './Types.ts';

import { set } from './set.ts';

export enum StoreEvents {
  Updated = 'updated',
}

export type StoreState = {
    isAuth: boolean,
    user: User,
    chats: Chats[],
    activeChatId: number,
    chatToken: string,
    chatUsers: ChatsUser[],
    messages: Message[],
    socket: ChatWS | null
  };

class Store extends EventBus {
  state: StoreState = {
    user: {
      avatar: '',
      phone: '',
      email: '',
      login: '',
      id: -1,
      second_name: '',
      first_name: '',
      display_name: '',

    },
    activeChatId: 0,
    chatUsers: [],
    isAuth: false,
    chats: [],
    chatToken: '',
    messages: [],
    socket: null,
  };

  public set(path: string, newState: unknown) {
    try {
      set(this.state, path, newState);
      this.emit(StoreEvents.Updated, this.getState());
    } catch (e) {
      /* eslint-disable-next-line no-console */
      console.log(e);
    }
  }

  public getState() {
    return this.state;
  }

  public getStateChats() {
    return this.state.chats;
  }
}

export const store = new Store();
export function connect(mapStateToProps: (state: StoreState) => Record<string, any>) {
  // eslint-disable-next-line func-names
  return function (Component: typeof Block) : typeof Block {
    return class extends Component {
      constructor(tagName: string, propsAndChildren: Props) {
        let state = mapStateToProps(store.getState());
        super(tagName, { ...propsAndChildren, ...state });
        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }
          state = newState;
        });
      }
    };
  };
}
