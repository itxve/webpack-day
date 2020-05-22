import _ from 'lodash';
const path = require('path');

function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(["你好a", 'webpack-Build\nbackgroud'], ' ');
  element.classList.add('hello');
  return element;
}

document.body.appendChild(component());



if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    console.log("load")
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}