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
const imports = ["_app/immutable/nodes/6.Ax_v9_au.js","_app/immutable/chunks/scheduler.BBfqLarD.js","_app/immutable/chunks/index.BP6FsQ8L.js","_app/immutable/chunks/crown.4TQNogzm.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.CFj6iOEW.js","_app/immutable/chunks/each.DxWbBfWu.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-Bt45wF8A.js.map
