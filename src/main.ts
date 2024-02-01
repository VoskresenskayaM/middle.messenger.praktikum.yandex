/* eslint-disable linebreak-style */
import './css/style.scss';
import { Page404 } from './pages/page404/page404';
import { Page505 } from './pages/page505/page505';
import { PageLogin } from './pages/pageLogin/pageLogin';
import { PageRegister } from './pages/pageRegister/pageRegister';
import { UserUpdate } from './pages/pageUserUpdate/pageUserUpdate';
import { UserProfile } from './pages/pageUserProfile/pageUserProfile';
import { UserUpdatePassword } from './pages/pageUpdatePassword/pageUpdatePassword';
import { PageChatConnect } from './pages/pageChat/pageChat';
import { router } from './utils/Router';
import { store } from './utils/Store';
import { ROUTES } from './utils/Constants';
import { AuthController } from './controllers/AuthController';

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
