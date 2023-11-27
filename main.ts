import './src/css/style.scss';
import { render } from './src/utils/renderDOM';
import Link from './src/components/link/link';
import List from './src/components/list/list';

const list = new List({
  attr: { class: 'main__index-list' },
  links: [
    new Link({
      title: 'login',
      href: '/src/pages/login/login.html',
    }),
    new Link({
      title: 'register',
      href: '/src/pages/register/register.html',
    }),
    new Link({
      title: 'userProfile',
      href: '/src/pages/userProfile/userProfile.html',
    }),
    new Link({
      title: 'userUpdate',
      href: '/src/pages/userUpdate/userUpdate.html',
    }),
    new Link({
      title: 'userPassword',
      href: '/src/pages/updatePassword/updatePassword.html',
    }),
    new Link({
      title: '404',
      href: '/src/pages/page404/page404.html',
    }),
    new Link({
      title: '505',
      href: '/src/pages/page505/page505.html',
    }),
    new Link({
      title: 'chat',
      href: '/src/pages/chat/chat.html',
    }),
  ],
});
render('.main__index-nav', list);
