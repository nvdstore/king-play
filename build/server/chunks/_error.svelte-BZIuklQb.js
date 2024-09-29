import { c as create_ssr_component, s as subscribe, v as validate_component, a as escape } from './ssr-D8vzeGmv.js';
import { p as page } from './stores-Cwz-jE6o.js';
import { I as Icon } from './Icon-6B7qrYG7.js';
import './client-BUusD8wq.js';
import './exports-BGi7-Rnc.js';

const Server_crash = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"
      }
    ],
    [
      "path",
      {
        "d": "M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"
      }
    ],
    ["path", { "d": "M6 6h.01" }],
    ["path", { "d": "M6 18h.01" }],
    ["path", { "d": "m13 6-4 6h6l-4 6" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "server-crash" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<div class="flex items-center justify-center w-full h-screen"><div class="flex flex-col items-center">${validate_component(Server_crash, "ServerCrash").$$render($$result, { size: 48 }, {}, {})} <h4 class="text-xl mb-5 mt-2">${escape($page.error?.message ?? "Terjadi Kesalahan")}</h4> <a href="/" class="btn btn-red" data-svelte-h="svelte-sc8a4s">Kembali ke Beranda</a></div></div>`;
});

export { Error as default };
//# sourceMappingURL=_error.svelte-BZIuklQb.js.map
