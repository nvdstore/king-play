import { c as create_ssr_component, v as validate_component } from './ssr-D8vzeGmv.js';
import { I as Icon } from './Icon-6B7qrYG7.js';

const Refresh_ccw = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
      }
    ],
    ["path", { "d": "M3 3v5h5" }],
    [
      "path",
      {
        "d": "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"
      }
    ],
    ["path", { "d": "M16 16h5v5" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "refresh-ccw" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});

export { Refresh_ccw as R };
//# sourceMappingURL=refresh-ccw-C4CCmAyx.js.map
