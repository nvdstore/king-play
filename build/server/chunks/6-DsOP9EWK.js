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
const imports = ["_app/immutable/nodes/6.C5MRsy_O.js","_app/immutable/chunks/scheduler.DDK_FMqP.js","_app/immutable/chunks/index.CLy-O5qq.js","_app/immutable/chunks/crown.CytOudWl.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.BGFqZV4V.js","_app/immutable/chunks/each.CMQ7KCsU.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-DsOP9EWK.js.map
