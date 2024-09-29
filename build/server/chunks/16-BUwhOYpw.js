import { g as getStoreByMember } from './store-DkaSSJZX.js';
import { v as validateEmail } from './validator-CNGUo1jv.js';
import './db-BEDA57LU.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';

const load = async ({ locals }) => {
  const session = await locals.auth();
  const result = await getStoreByMember(session?.user?.id);
  const store = {
    idMember: result.id_member,
    name: result.name,
    description: result.description,
    phone: result.phone,
    email: result.email,
    domain: result.domain,
    logo: result.logo,
    info: {
      fb: result.fb,
      tiktok: result.tiktok,
      ig: result.ig,
      telegram: result.telegram,
      twitter: result.twitter
    }
  };
  return {
    store
  };
};
const actions = {
  store: async ({ request }) => {
    const body = await request.formData();
    const name = body.get("store-name")?.toString();
    body.get("store-desc")?.toString();
    const email = body.get("store-email")?.toString();
    const phone = body.get("store-phone")?.toString();
    let errorBag = {};
    let valueBag = {
      name,
      email,
      phone
    };
    if (!name) {
      errorBag.name = "Nama harus diisi";
    }
    if (!email) {
      errorBag.email = "Email harus diisi";
    } else if (!validateEmail(email.toString())) {
      errorBag.email = "Format email salah";
    }
    if (!phone) {
      errorBag.phone = "Nomor harus diisi";
    }
    if (Object.keys(errorBag).length) {
      return { errors: errorBag, values: valueBag };
    }
  },
  social: async (event) => {
  },
  user: async (event) => {
  },
  password: async (event) => {
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 16;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BkPmPKIV.js')).default;
const server_id = "src/routes/(dashboard)/dashboard/store/+page.server.ts";
const imports = ["_app/immutable/nodes/16.Deff9ML6.js","_app/immutable/chunks/scheduler.4YBzcwTj.js","_app/immutable/chunks/index.BNFUcRFq.js","_app/immutable/chunks/save.Bp9YL5Sm.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.zC-8_Prq.js","_app/immutable/chunks/each.tx5UTMWu.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=16-BUwhOYpw.js.map
