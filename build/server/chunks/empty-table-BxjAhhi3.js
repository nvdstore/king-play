import { c as create_ssr_component, v as validate_component, a as escape } from './ssr-D8vzeGmv.js';
import { I as Icon } from './Icon-6B7qrYG7.js';

const Inbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "polyline",
      {
        "points": "22 12 16 12 14 15 10 15 8 12 2 12"
      }
    ],
    [
      "path",
      {
        "d": "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "inbox" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Empty_table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { description = "Belum ada data" } = $$props;
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  return `<div class="space-y-1 flex flex-col items-center justify-center min-h-[200px]">${validate_component(Inbox, "Inbox").$$render($$result, { size: 32 }, {}, {})} <div class="space-y-0 5 text-center"><h2 class="text-lg" data-svelte-h="svelte-1ldd3jt">Tidak ada data</h2> <p>${escape(description)}</p></div></div>`;
});

export { Empty_table as E };
//# sourceMappingURL=empty-table-BxjAhhi3.js.map
