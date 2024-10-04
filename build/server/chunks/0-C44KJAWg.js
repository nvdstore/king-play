const load = async ({ url, locals }) => {
  const host = url.hostname;
  const masterHost = host == "localhost" || host == "kingplay.id" || host == "www.kingplay.id";
  return {
    masterHost
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-BWquMCM-.js')).default;
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/nodes/0.B1BTDSCf.js","_app/immutable/chunks/scheduler.CcfLnVM_.js","_app/immutable/chunks/index.B-0vqY2A.js","_app/immutable/chunks/each.DAmsSjCb.js","_app/immutable/chunks/index.CDqIpYcz.js","_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.d7ZplmeP.js","_app/immutable/chunks/index.DYWfvrca.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/stores.Bff2IPOf.js","_app/immutable/chunks/entry.BEL7CgLR.js"];
const stylesheets = ["_app/immutable/assets/0.N4B_JcOW.css","_app/immutable/assets/SvelteToast.DbLvtVfH.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-C44KJAWg.js.map
