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
const imports = ["_app/immutable/nodes/5.quny_9ml.js","_app/immutable/chunks/scheduler.6KT2eGMr.js","_app/immutable/chunks/index.B8s6-p5L.js","_app/immutable/chunks/entry.D_G1TyTl.js","_app/immutable/chunks/index.B4FbLfrC.js","_app/immutable/chunks/general.BZVfGAiX.js","_app/immutable/chunks/stores.D3HUAG9M.js","_app/immutable/chunks/client.DovYH1Fe.js","_app/immutable/chunks/crown.CDQ7V0b7.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.QrzoY6PX.js","_app/immutable/chunks/each.MhIJo3BG.js","_app/immutable/chunks/store.nyVLdEd3.js","_app/immutable/chunks/clock.BoAt_lwG.js"];
const stylesheets = ["_app/immutable/assets/5.BNeEkUow.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-D46wMj9l.js.map
