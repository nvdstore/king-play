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
const component = async () => component_cache ??= (await import('./_layout.svelte-B6JGeykj.js')).default;
const server_id = "src/routes/(dashboard)/dashboard/+layout.server.ts";
const imports = ["_app/immutable/nodes/4.DuTAANNS.js","_app/immutable/chunks/8.4XKJvd4g.js","_app/immutable/chunks/index.BrjDpy8l.js","_app/immutable/chunks/entry.D6cYmGy0.js","_app/immutable/chunks/stores.B4O8sMcN.js","_app/immutable/chunks/client.C-6W-0bc.js","_app/immutable/chunks/crown.DoDjfBTI.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.BCF990Jr.js","_app/immutable/chunks/each.C8EVOQy8.js","_app/immutable/chunks/store.Dqch8l0D.js","_app/immutable/chunks/clock.CN700y0t.js"];
const stylesheets = ["_app/immutable/assets/4.BNeEkUow.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-BSNpsa7P.js.map
