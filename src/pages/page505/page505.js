import '../../css/style.scss';
import { render } from '../../utils/renderDOM';
import page404 from '../../components/page404/page404';

const pageError = new page404({
    error: "505",
    message:"Уже фиксим",
    link: "/src/pages/chats/chats.html",
    attr:{
        class:"page404__block"
    }

  });

render("#app", pageError);
