import '../../css/style.scss';
import { render } from '../../utils/renderDOM'

import ButtonTest from '../../components/test_sprint_2_button/ButtonTest';

const button = new ButtonTest({
    text: "Click me",
    attr: {
      class: "user__form-button",
      type:"button", 
    },
    events: {
      // Названия события точно такие же, как и у первого аргумента addEventListener: 
      // click, mouseEnter, ...
      click: event => {
        console.log(event);
      },
    },
  });
render("#app", button);
