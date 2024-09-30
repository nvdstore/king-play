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
const imports = ["_app/immutable/nodes/0.CHL-Ojm_.js","_app/immutable/chunks/scheduler.BBfqLarD.js","_app/immutable/chunks/index.BP6FsQ8L.js","_app/immutable/chunks/each.DxWbBfWu.js","_app/immutable/chunks/index.BWr1KjGO.js","_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.yrqkKXpK.js","_app/immutable/chunks/index.CKUPByak.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/stores.DCjakhug.js","_app/immutable/chunks/entry.Ck7nOtBn.js"];
const stylesheets = ["_app/immutable/assets/0.D41Mtpnl.css","_app/immutable/assets/SvelteToast.DbLvtVfH.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-DqJ6yVgN.js.map
