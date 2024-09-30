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
const imports = ["_app/immutable/nodes/0.g6AgrZHc.js","_app/immutable/chunks/scheduler.6KT2eGMr.js","_app/immutable/chunks/index.B8s6-p5L.js","_app/immutable/chunks/each.MhIJo3BG.js","_app/immutable/chunks/index.CbVfT7vS.js","_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.CY_U3FVi.js","_app/immutable/chunks/index.B4FbLfrC.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/stores.Fbx72-1O.js","_app/immutable/chunks/entry.CAuGH5yM.js"];
const stylesheets = ["_app/immutable/assets/0.DGebFDfU.css","_app/immutable/assets/SvelteToast.DbLvtVfH.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-bqoix9xX.js.map
