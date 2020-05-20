import _ from 'lodash';
import './style.css';
import pig from './pig.png';

function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(["你好a", 'webpack-Build\nbackgroud'], ' ');
  element.classList.add('hello');

  // 将图像添加到我们现有的 div。
  var pigIcon = new Image();
  pigIcon.src = pig;

  element.appendChild(pigIcon);

  return element;
}

document.body.appendChild(component());