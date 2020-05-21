import { cube } from './math.js';

if (process.env.NODE_ENV == 'production') {
  console.log('$$$$$$$$$$$$$$$$$$#########################$$$$$$$$$$$$$$$$$$3333');
}

function component() {
  var element = document.createElement('div');
  var element = document.createElement('pre');

  // lodash 是由当前 script 脚本 import 导入进来的
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(22)
  ].join('\n\n');

  return element;
}

document.body.appendChild(component());


