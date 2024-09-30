import { t as themes } from './themes-AOUMct7e.js';

const load = async () => {
  const color = "blue";
  const theme = themes["light"];
  return {
    color,
    theme
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-Djbm4J8p.js')).default;
const server_id = "src/routes/(member)/auth/+layout.server.ts";
const imports = ["_app/immutable/nodes/6.D5If_oBh.js","_app/immutable/chunks/scheduler.6KT2eGMr.js","_app/immutable/chunks/index.B8s6-p5L.js","_app/immutable/chunks/crown.CDQ7V0b7.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.QrzoY6PX.js","_app/immutable/chunks/each.MhIJo3BG.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-B_eq-6h1.js.map
