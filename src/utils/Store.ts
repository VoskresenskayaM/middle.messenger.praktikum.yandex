// eslint-disable-next-line max-classes-per-file
import EventBus from './EventBus.ts';
import { Block } from './Block.ts';
import isEqual from './isEqual.ts';
import { Chats, ChatsUser } from '../api/ChatApi.ts';

import {
  User, ChatView, MessageView, Props,
} from './Types.ts';

import { set } from './set.ts';

export enum StoreEvents {
  Updated = 'updated',
}

export type StoreState = {
    isAuth: boolean,
    user: User,
    chats: Chats[],
    messages: Record<number, MessageView[]>,
    activeChatId: number | null,
    activeChatUsers?: ChatsUser
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
    activeChatId: null,
    activeChatUsers: undefined,
    isAuth: false,
    messages: {},
    chats: [],
    // номер выбранного чата
  };

  public set(path: string, newState: unknown) {
    try {
      set(this.state, path, newState);
      this.emit(StoreEvents.Updated, this.getState());
    } catch (e) {
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
        // сохраняем начальное состояние
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
