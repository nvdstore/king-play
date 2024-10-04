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
const component = async () => component_cache ??= (await import('./_layout.svelte-DK3VIoqC.js')).default;
const server_id = "src/routes/(member)/(dashboard)/dashboard/+layout.server.ts";
const imports = ["_app/immutable/nodes/5.Ray2p-i_.js","_app/immutable/chunks/scheduler.DDK_FMqP.js","_app/immutable/chunks/index.CLy-O5qq.js","_app/immutable/chunks/entry.eGK5Mmx5.js","_app/immutable/chunks/index.zbdKov3I.js","_app/immutable/chunks/general.LFs18mWw.js","_app/immutable/chunks/stores.CW4ATsLg.js","_app/immutable/chunks/client.CR1AFNei.js","_app/immutable/chunks/crown.CytOudWl.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.BGFqZV4V.js","_app/immutable/chunks/each.CMQ7KCsU.js","_app/immutable/chunks/store.Bt8_O_y-.js","_app/immutable/chunks/house.B7KbXKPE.js","_app/immutable/chunks/clock.DPecC3uq.js"];
const stylesheets = ["_app/immutable/assets/5.BNeEkUow.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-BnLAAU6h.js.map
