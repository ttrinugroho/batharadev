import './main.scss';
import 'lazysizes';
import hotroute from 'hotroute';
declare function gtag(command: 'config' | 'set' | 'event', id: string, config?: any): void;

(() => {
  document.addEventListener('DOMContentLoaded', e => {
    const router = hotroute({ log: true });

    const ifExists = (el, style, val) => {
      if (el) {
        el.style[style] = val;
      }
    };

    const isSmall = () => window.innerWidth <= 768;

    const $ = (selector) => window.document.querySelector(selector);
    let attri = window.document.querySelector('body');
    if (typeof (Storage) !== undefined) {
      if (localStorage.bTheme) {
        attri.attributes['data-theme'].value = localStorage.bTheme
      } else {
        localStorage.bTheme = attri.attributes['data-theme'].value
      }
    }
    $('#chang-theme').addEventListener('click', (e) => {
      console.log('clicked')
      if (attri.attributes['data-theme'].value === "dark") {
        localStorage.bTheme = "light"
        attri.attributes['data-theme'].value = "light"
      } else {
        attri.attributes['data-theme'].value = "dark"
        localStorage.bTheme = "dark"
      }
    })

    // text
    window.addEventListener('router:end', e => {
      const page_path = new URL(window.history.state['url']).pathname;

      gtag('config', 'UA-59099331-16', { page_path });
    });
  })

})();