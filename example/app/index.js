import { join } from 'lodash';
import './styles.scss';

function component () {
  const element = document.createElement('div');

  // lodash! :)
  element.innerHTML = join(['Hello','world'], ' ');

  return element;
}

document.body.appendChild(component());