import { S as Store } from './store-DgD9K3hN.js';
import './db-BEDA57LU.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';

const load = async (events) => {
  const session = await events.locals.auth();
  const store = await Store.getStoreByMember(session?.user?.id);
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
const component = async () => component_cache ??= (await import('./_layout.svelte-BdcbyF1R.js')).default;
const server_id = "src/routes/(dashboard)/dashboard/+layout.server.ts";
const imports = ["_app/immutable/nodes/4.BNRioRuV.js","_app/immutable/chunks/8.D6-lxqIh.js","_app/immutable/chunks/index.qVoW8Mvc.js","_app/immutable/chunks/entry.Dr0Jcpdl.js","_app/immutable/chunks/index.BSQMf5lU.js","_app/immutable/chunks/stores.SRU3X2C0.js","_app/immutable/chunks/client.COgm7vqe.js","_app/immutable/chunks/crown.Ci8VROjV.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.DnJzLTTh.js","_app/immutable/chunks/each.BYqwBxiO.js","_app/immutable/chunks/store.DgN1_U5y.js","_app/immutable/chunks/clock.DQL3ez_q.js"];
const stylesheets = ["_app/immutable/assets/4.BNeEkUow.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-CCS2k-g6.js.map
