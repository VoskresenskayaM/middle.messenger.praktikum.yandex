/* eslint-disable linebreak-style */
import './src/css/style.scss';
import { render } from './src/utils/renderDOM';
import Link from './src/components/link/link';
import List from './src/components/list/list';

import { Page404 } from './src/pages/page404/page404';
import { Page505 } from './src/pages/page505/page505';
import { PageLogin } from './src/pages/pageLogin/pageLogin';
import { PageRegister } from './src/pages/pageRegister/pageRegister';
import { UserUpdate } from './src/pages/pageUserUpdate/pageUserUpdate';
import { UserProfile } from './src/pages/pageUserProfile/pageUserProfile';
import { UserUpdatePassword } from './src/pages/pageUpdatePassword/pageUpdatePassword';
import { PageChat } from './src/pages/pageChat/pageChat';
import { PageChats } from './src/pages/pageChats/pageChats'
import { BlockComponent } from './src/utils/Route';
import { Block } from './src/utils/Block';
import FormValidator from './src/utils/FormValidator';
import { regFormSettings, ROUTES } from './src/utils/Constants';
import { router } from './src/utils/Router';
import { store } from './src/utils/Store';

/* declare global {
  interface Window {
      page:any;
  }
} */

/* const list = new List({
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
render('.main__index-nav', list); */
/* window.addEventListener('DOMContentLoaded', async () => {
  router.use('/404', pageError404);
   router.use('/login', pageLogin as Block);
  router.start();

  router.go('/login');
}) */

window.addEventListener('DOMContentLoaded', async () => {
  router.use(ROUTES.NOT_FOUND, Page404)
    .use(ROUTES.ERROR, Page505)
    .use(ROUTES.SIGNIN, PageLogin)
    .use(ROUTES.SIGNUP, PageRegister)
    .use(ROUTES.PROFILE, UserProfile)
    .use(ROUTES.PROFILE_EDIT_DATA, UserUpdate)
    .use(ROUTES.PROFILE_EDIT_PASSWORD, UserUpdatePassword)
    .use(ROUTES.CHAT, PageChat)
    .use(ROUTES.CHATS, PageChats)


  router.start();
// добавлять валидацию в зависимости от класса Page
/* const valid = new FormValidator(regFormSettings);
valid.enableValidation(); */
});
