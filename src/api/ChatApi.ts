import { User } from '../utils/Types';
import { BaseApi } from './BaseApi';

export type GetChatsData = {
    offset: number,
    limit: number,
    title?: number
}

export type LastMessage= {
     user: User,
     time: string,
     content: string
}

export type Chats = {
    id: number,
    title: string,
    avatar?: string,
    unread_count: number,
    created_by: number,
    last_message?: LastMessage,
}

export type ChatsUser = {
  id: number,
  first_name: string,
  second_name: string,
  display_name?: string,
  login: string,
  avatar?: string,
  role: string
}

export class ChatsApi extends BaseApi {
  constructor() {
    super('/chats');
  }

  getChats(data: GetChatsData): Promise<Chats[]> {
    return this.http.get('', { data });
  }

  createChats(data: { title: string }): Promise<{ id: number }> {
    return this.http.post('', { data });
  }

  addUserInChat(data: { users: number[], chatId: number }) {
    return this.http.put('/users', { data });
  }

  removeUserFromChat(data: { users: number[], chatId: number }) {
    return this.http.delete('/users', { data });
  }

  getToken(id: number): Promise<{ token: string }> {
    return this.http.post(`/token/${id}`);
  }

  getUsersFromChat(chatId: number): Promise<ChatsUser[]> {
    return this.http.get(`/${chatId}/users`);
  }

  loadAvatarChat(data: FormData): Promise<Chats> {
    return this.http.put('/avatar', { data });
  }

  deleteChat(data: {chatId: number}) {
    return this.http.delete('', { data });
  }

  deleteChatUsers(data: {users: number [], chatId: number}) {
    return this.http.delete('/users', { data });
  }

  create = undefined;

  update = undefined;

  delete = undefined;

  read = undefined;
}

export const chatsApi = new ChatsApi();
