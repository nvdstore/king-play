import { t as themes } from './themes-CoZBCasr.js';

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
const imports = ["_app/immutable/nodes/6.BN98ZbdH.js","_app/immutable/chunks/scheduler.CcfLnVM_.js","_app/immutable/chunks/index.B-0vqY2A.js","_app/immutable/chunks/crown.DceQQoCq.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.BWg40YSe.js","_app/immutable/chunks/each.DAmsSjCb.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-CL8jRJxK.js.map
