import {
  ChatsApi, chatsApi, GetChatsData, ChatsUser, Chats,
} from '../api/ChatApi';
import { ROUTES } from '../utils/Constants';
import { router } from '../utils/Router';
import { store } from '../utils/Store';
import { User } from '../utils/Types';

class ChatController {
  private _api: ChatsApi;

  constructor() {
    this._api = chatsApi;
  }

  async createChat(title: string) {
    try {
      await this._api.createChats({ title });
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error);
      alert('Не удалось создать чаты');
    }
  }

  async getChats(data: GetChatsData) {
    try {
      const chats = await this._api.getChats(data);
      store.set('chats', chats);
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error);
      alert('Не удалось получить чаты');
    }
  }

  async initChat() {
    try {
      
      const { user, activeChatId } = store.getState();
      const userId = user?.id;
      const chatId = activeChatId;
      // работа с socket
    } catch (error) {
    /* eslint-disable-next-line no-console */
      console.error(error);
    }
  }

  async addUserInChat(data: { users: number[], chatId: number }) {
    try {
      await this._api.addUserInChat(data);
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error);
      alert('Не удалось получить пользователя чата по ID');
    }
  }

  async getUsersFromChat() {
    const { activeChatId } = store.getState();
    const chatId = activeChatId;

    try {
      if (chatId) {
        const chatsUser = await this._api.getUsersFromChat(chatId);
        store.set('activeChatUsers', chatsUser);
      }
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error);
      alert('Не удалось установаить пользователя в чат');
    }
  }
}

export const chatController = new ChatController();
