import { cube } from './math.js';


function component() {
  var element = document.createElement('div');
  var button = document.createElement('button');
  button.innerHTML = "Click"
  button.onclick = () => {
    console.log(process.env.NODE_ENV);
    console.log(process.env.NODE_ENV != 'production');
    console.log(process.env.NODE_ENV !== "production");
    console.log(process.env.NODE_ENV == 'production');
    console.log(process.env.NODE_ENV === "production");
    console.log(process.env.NODE_ENV === 'production');
  }

  // lodash 是由当前 script 脚本 import 导入进来的
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(22)
  ].join('\n\n');
  element.appendChild(button)
  return element;
}

document.body.appendChild(component());


