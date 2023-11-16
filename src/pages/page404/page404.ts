import '../../css/style.scss';
import { render } from '../../utils/renderDOM';
import Page404 from '../../components/page404/page404';

const pageError = new Page404({
  error: '404',
  message: 'Не туда попали',
  link: '/src/pages/chats/chats.html',
  attr: {
    class: 'page404__block',
  },

});

render('#app', pageError);
