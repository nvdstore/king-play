import { g as getStoreByMember } from './store-BpRRwYsz.js';
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
const imports = ["_app/immutable/nodes/4.dnHQetc8.js","_app/immutable/chunks/scheduler.BocGr1Ux.js","_app/immutable/chunks/index.BQZXa2CZ.js","_app/immutable/chunks/entry.D57uCVz2.js","_app/immutable/chunks/index.Ark2ieeu.js","_app/immutable/chunks/general.CBk7dzIs.js","_app/immutable/chunks/stores.ZPMS3l-g.js","_app/immutable/chunks/client.L8I_S4KU.js","_app/immutable/chunks/crown.B8uIPv2p.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.Beuh8PMk.js","_app/immutable/chunks/each.Tt0-nXae.js","_app/immutable/chunks/store.BCmTgAbF.js","_app/immutable/chunks/clock.Br8RMJJq.js"];
const stylesheets = ["_app/immutable/assets/4.BNeEkUow.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-Cag7F9FT.js.map
