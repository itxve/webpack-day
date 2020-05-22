import { file, parse } from './globals.js';

function component() {
  var element = document.createElement('div');
  element.innerHTML = join(['Hello', 'webpack'], ' ');
  // Assume we are in the context of `window`
  parse();
  return element;
}

document.body.appendChild(component());