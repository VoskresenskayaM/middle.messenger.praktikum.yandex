export type User = {
    id: number;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
    display_name: string;
    };

export type ChatView = {
        id: number;
        name: string;
        message: string;
        lastTime: string;
        count: number;
        avatar: string;
        isMe: boolean;
      };

export type MessageView = {
        id: number;
        userId: number;
        isMe: boolean;
        photo: string;
        message: string;
        time: string;
      };

export type Message = {
        chat_id: number;
        content: string;
        file: object | null;
        id: number;
        is_read: boolean;
        time: string;
        type: string;
        user_id: number;
      }

export type Props = Record<string, any>;

export type formType = HTMLFormElement | undefined;
