import '../../css/style.scss';
import Chat from '../../components/chat/chat';
import Chats from '../../components/chats/chats';
import Feed from '../../components/feed/feed';
import { render } from '../../utils/renderDOM';
import ChatLink from '../../components/chatLink/chatLink';
import ChatForm from '../../components/chatForm/chatForm';
import ChatArr from '../../components/chatsArr/chatsArr';
import ChatItem from '../../components/chatItem/chatItem';

const сhatLink = new ChatLink({
  attr: {
    class: 'chats__profile-link-block',
  },
});

const chatForm = new ChatForm({
  attr: {
    class: 'chats__search-block',
  },
});

const chatArr = new ChatArr({
  attr: {
    class: 'chats__block',
  },
  items: [
    new ChatItem({
      attr: {
        class: 'chats__chat',
      },
      name: 'Андрей',
      time: '12.00',
      message: `Значимость этих проблем настолько очевидна, 
      что реализация намеченных плановых заданий позволяет 
      оценить значение систем массового участия.`,
      count: '4',
    }),
    new ChatItem({
      attr: {
        class: 'chats__chat',
      },
      name: 'Андрей',
      time: '12.00',
      message: `Значимость этих проблем настолько очевидна, 
      что реализация намеченных плановых заданий позволяет 
      оценить значение систем массового участия.`,
      count: '4',
    }),
    new ChatItem({
      attr: {
        class: 'chats__chat',
      },
      name: 'Андрей',
      time: '12.00',
      message: `Значимость этих проблем настолько очевидна, 
      что реализация намеченных плановых заданий позволяет 
      оценить значение систем массового участия.`,
      count: '4',
    }),
    new ChatItem({
      attr: {
        class: 'chats__chat',
      },
      name: 'Андрей',
      time: '12.00',
      message: `Значимость этих проблем настолько очевидна, 
      что реализация намеченных плановых заданий позволяет 
      оценить значение систем массового участия.`,
      count: '4',
    }),
  ],
});

const chats = new Chats({
  attr: {
    class: 'chats',
  },
  chatLink: сhatLink,
  chatForm,
  chatsArr: chatArr,
});

const feed = new Feed({
  attr: {
    class: 'feed',
  },
});

const chat = new Chat({
  attr: {
    class: 'chat',
  },
  chat: chats,
  feed,
});

render('#app', chat);
