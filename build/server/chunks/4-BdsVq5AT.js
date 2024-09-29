import { g as getStoreByMember } from './store-DkaSSJZX.js';
import './db-BEDA57LU.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';

const load = async (events) => {
  const session = await events.locals.auth();
  const store = await getStoreByMember(session?.user?.id);
  return {
    store,
    user: session?.user
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-ClhhMPcU.js')).default;
const server_id = "src/routes/(dashboard)/dashboard/+layout.server.ts";
const imports = ["_app/immutable/nodes/4.CCUP-eiu.js","_app/immutable/chunks/scheduler.4YBzcwTj.js","_app/immutable/chunks/index.BNFUcRFq.js","_app/immutable/chunks/entry.CwivGntT.js","_app/immutable/chunks/index.BQ1UVc3K.js","_app/immutable/chunks/general.BYefm5Bk.js","_app/immutable/chunks/stores.DO0B0Jqy.js","_app/immutable/chunks/client.tt94ja3m.js","_app/immutable/chunks/crown.BcGhwUv-.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.zC-8_Prq.js","_app/immutable/chunks/each.tx5UTMWu.js","_app/immutable/chunks/store.DljRji7S.js","_app/immutable/chunks/clock.x8SrJwgu.js"];
const stylesheets = ["_app/immutable/assets/4.BNeEkUow.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-BdsVq5AT.js.map
