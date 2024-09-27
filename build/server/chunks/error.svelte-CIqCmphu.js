import { c as create_ssr_component, s as subscribe, a as escape } from './ssr-D8vzeGmv.js';
import { p as page } from './stores-Cwz-jE6o.js';
import './client-BUusD8wq.js';
import './exports-BGi7-Rnc.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
});

export { Error as default };
//# sourceMappingURL=error.svelte-CIqCmphu.js.map
