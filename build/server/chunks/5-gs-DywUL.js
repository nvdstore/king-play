import { a as getStoreByMember } from './store-BcfelaBj.js';
import './db-Dt_6_ZQU.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';

const load = async (events) => {
  const { user } = await events.parent();
  const storeData = await getStoreByMember(user?.idMember);
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
    store
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
const imports = ["_app/immutable/nodes/5.DcMCTazz.js","_app/immutable/chunks/scheduler.CcfLnVM_.js","_app/immutable/chunks/index.B-0vqY2A.js","_app/immutable/chunks/entry.BEL7CgLR.js","_app/immutable/chunks/index.DYWfvrca.js","_app/immutable/chunks/general.ChbU9oPy.js","_app/immutable/chunks/stores.Bff2IPOf.js","_app/immutable/chunks/client.Bz9D2ONP.js","_app/immutable/chunks/crown.DceQQoCq.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.BWg40YSe.js","_app/immutable/chunks/each.DAmsSjCb.js","_app/immutable/chunks/store.DhXN1MmQ.js","_app/immutable/chunks/clock.CKDdOqe7.js"];
const stylesheets = ["_app/immutable/assets/5.BNeEkUow.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-gs-DywUL.js.map
