import { v as validateEmail } from './validator-CNGUo1jv.js';

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
  actions: actions
});

const index = 15;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-RO9oxU48.js')).default;
const server_id = "src/routes/(dashboard)/dashboard/settings/+page.server.ts";
const imports = ["_app/immutable/nodes/15.byKf2VWA.js","_app/immutable/chunks/8.D6-lxqIh.js","_app/immutable/chunks/index.qVoW8Mvc.js","_app/immutable/chunks/store.DgN1_U5y.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.DnJzLTTh.js","_app/immutable/chunks/each.BYqwBxiO.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=15-ClNqnG6e.js.map
