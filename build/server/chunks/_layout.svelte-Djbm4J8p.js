import { c as create_ssr_component, v as validate_component, a as escape } from './ssr-D8vzeGmv.js';
import { C as Crown } from './crown-vreO4snm.js';
import './Icon-6B7qrYG7.js';

const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div class="flex flex-col items-center justify-center py-16 mx-auto space-y-6 overflow-y-auto"><a href="/">${validate_component(Crown, "Crown").$$render($$result, { size: 38 }, {}, {})}</a> <div class="${"w-full md:w-[450px] md:" + escape(data.theme.card, true) + " md:px-8 md:py-10"}">${slots.default ? slots.default({}) : ``}</div></div>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-Djbm4J8p.js.map
