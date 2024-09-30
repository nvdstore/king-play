import { a as getStoreByMember } from './store-8a_gaJzG.js';
import './db-Dt_6_ZQU.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';

const load = async (events) => {
  const session = await events.locals.auth();
  const storeData = await getStoreByMember(session?.user?.id);
  const store = {
    idMember: storeData.id_member,
    name: storeData.name,
    description: storeData.description,
    phone: storeData.phone,
    email: storeData.email,
    domain: storeData.custom_domain ?? storeData.domain,
    logo: storeData.logo,
    promo: [],
    theme: storeData.theme,
    color: storeData.color,
    info: {
      fb: storeData.fb,
      tiktok: storeData.tiktok,
      ig: storeData.ig,
      telegram: storeData.telegram,
      twitter: storeData.twitter
    }
  };
  return {
    store,
    user: session?.user
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-ClhhMPcU.js')).default;
const server_id = "src/routes/(member)/(dashboard)/dashboard/+layout.server.ts";
const imports = ["_app/immutable/nodes/5.fKW0JjQp.js","_app/immutable/chunks/scheduler.BBfqLarD.js","_app/immutable/chunks/index.BP6FsQ8L.js","_app/immutable/chunks/entry.Ck7nOtBn.js","_app/immutable/chunks/index.CKUPByak.js","_app/immutable/chunks/general.Mrt61Pui.js","_app/immutable/chunks/stores.DCjakhug.js","_app/immutable/chunks/client.CIOwL0ip.js","_app/immutable/chunks/crown.4TQNogzm.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.CFj6iOEW.js","_app/immutable/chunks/each.DxWbBfWu.js","_app/immutable/chunks/store.D2f7jZ_L.js","_app/immutable/chunks/clock.Cw3wKIDg.js"];
const stylesheets = ["_app/immutable/assets/5.BNeEkUow.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-BxwFDZiA.js.map
