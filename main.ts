/* eslint-disable linebreak-style */
import './src/css/style.scss';
import { Page404 } from './src/pages/page404/page404';
import { Page505 } from './src/pages/page505/page505';
import { PageLogin } from './src/pages/pageLogin/pageLogin';
import { PageRegister } from './src/pages/pageRegister/pageRegister';
import { UserUpdate } from './src/pages/pageUserUpdate/pageUserUpdate';
import { UserProfile } from './src/pages/pageUserProfile/pageUserProfile';
import { UserUpdatePassword } from './src/pages/pageUpdatePassword/pageUpdatePassword';
import { PageChatConnect } from './src/pages/pageChat/pageChat';
import { router } from './src/utils/Router';
import { store } from './src/utils/Store';
import { ROUTES } from './src/utils/Constants';
import { AuthController } from './src/controllers/AuthController';

window.addEventListener('DOMContentLoaded', async () => {
  router.use(ROUTES.PROFILE, UserProfile)
    .use(ROUTES.SIGNIN, PageLogin)
    .use(ROUTES.CHAT, PageChatConnect)
    .use(ROUTES.SIGNUP, PageRegister)
    .use(ROUTES.NOT_FOUND, Page404)
    .use(ROUTES.ERROR, Page505)
    .use(ROUTES.PROFILE_EDIT_DATA, UserUpdate)
    .use(ROUTES.PROFILE_EDIT_PASSWORD, UserUpdatePassword);

  let isProtectedRoute = true;
  const authController = new AuthController();
  await authController.fetchUser();
  if (window.location.pathname === ROUTES.SIGNIN
      || window.location.pathname === ROUTES.SIGNUP
      || window.location.pathname === ROUTES.NOT_FOUND
  ) isProtectedRoute = false;

  try {
    router.start();

    if (!Object.values(ROUTES).includes(window.location.pathname)) {
      router.go(ROUTES.NOT_FOUND);
    }

    if (store.getState().isAuth && !isProtectedRoute) {
      router.go(ROUTES.PROFILE);
    }

    if (!store.getState().isAuth && isProtectedRoute) {
      router.go(ROUTES.SIGNIN);
    }
  } catch (e) {
    router.start();

    router.go(ROUTES.ERROR);
  }
});
