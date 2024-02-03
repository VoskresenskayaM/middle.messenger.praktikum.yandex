import { ChatsApi, chatsApi, GetChatsData } from '../api/ChatApi';
import { CHATS_URL } from '../utils/Constants';
import { store } from '../utils/Store';
import { ChatWS } from '../utils/ChatSocket';

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
      // eslint-disable-next-line no-alert
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
      // eslint-disable-next-line no-alert
      alert('Не удалось получить чаты');
    }
  }

  async initChat() {
    try {
      const { user, activeChatId } = store.getState();
      const userId = user?.id;
      const chatId = activeChatId;
      const token = await this._api.getToken(chatId);
      if (!token) return;
      store.set('chatToken', token.token);
      const WSClient = new ChatWS(
        `${CHATS_URL}/${userId}/${chatId}/${token.token}`,
      );
      await WSClient.connect();
      store.set('socket', WSClient);
      WSClient.getOldMessages('0');
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
      // eslint-disable-next-line no-alert
      alert('Не удалось получить пользователя чата по ID');
    }
  }

  async getUsersFromChat() {
    const { activeChatId } = store.getState();
    const chatId = activeChatId;
    try {
      if (chatId) {
        const chatsUser = await this._api.getUsersFromChat(chatId);
        store.set('chatUsers', chatsUser);
      }
    } catch (error) {
      /* eslint-disable-next-line no-console, no-alert */
      alert('Не удалось установаить пользователя в чат');
    }
  }

  async deleteChat(data: {chatId: number}) {
    try {
      await this._api.deleteChat(data);
      const { chats } = store.getState();
      const newChats = chats?.filter((item) => item.id !== data.chatId);
      store.set('chats', newChats);
      store.set('activeChatId', null);
      store.set('chatUsers', []);
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error);
    }
  }

  async removeUserFromChat(data: { users: number[], chatId: number }) {
    try {
      await this._api.removeUserFromChat(data);
      const { chatUsers } = store.getState();
      const newChats = chatUsers?.filter((item) => item.id !== data.users[0]);
      store.set('deleteUserId', 0);
      store.set('chatUsers', newChats);
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error);
    }
  }
}

export const chatController = new ChatController();
