import { r as redirect } from './index-DyoisQP2.js';
import { v as validateEmail, c as checkDomain } from './validator-CNGUo1jv.js';
import { S as Store } from './store-DgD9K3hN.js';
import './db-BEDA57LU.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';

const actions = {
  default: async ({ request, locals }) => {
    const session = await locals.auth();
    const body = await request.formData();
    const name = body.get("name")?.toString();
    const desc = body.get("desc")?.toString();
    const email = body.get("email")?.toString();
    const phone = body.get("phone")?.toString();
    const domain = body.get("domain")?.toString();
    const domainType = body.get("domain-type")?.toString();
    let errorBag = {};
    let valueBag = {
      name,
      desc,
      email,
      phone,
      domain,
      domainType
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
      errorBag.phone = "Nomor handphone harus diisi";
    }
    if (!domain || !domain) {
      errorBag.domain = "Domain harus diisi";
    }
    const subdomain = `${domain}${domainType}`;
    if (!checkDomain(subdomain)) {
      errorBag.domain = "Format Domain salah";
    }
    if (Object.keys(errorBag).length) {
      return { errors: errorBag, values: valueBag };
    }
    const storeData = {
      memberId: session?.user?.id,
      name,
      description: desc ?? "",
      email,
      phone,
      domain: subdomain
    };
    const { error } = await Store.create(storeData);
    if (error) {
      errorBag.message = error ?? "Terjadi kesalahan";
      return { errors: errorBag, values: valueBag };
    }
    return redirect(307, "/dashboard");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 17;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CS7jKWWU.js')).default;
const server_id = "src/routes/(dashboard)/onboarding/+page.server.ts";
const imports = ["_app/immutable/nodes/17.DIEVbeQM.js","_app/immutable/chunks/8.D6-lxqIh.js","_app/immutable/chunks/index.qVoW8Mvc.js","_app/immutable/chunks/index.DELV8H0S.js","_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.BXZOnz8F.js","_app/immutable/chunks/index.BSQMf5lU.js","_app/immutable/chunks/entry.CvHxuCWh.js","_app/immutable/chunks/forms.3Rl3CauW.js","_app/immutable/chunks/client.CN_4ipSk.js","_app/immutable/chunks/formatter.1SswtO-0.js","_app/immutable/chunks/crown.Ci8VROjV.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.DnJzLTTh.js","_app/immutable/chunks/each.BYqwBxiO.js"];
const stylesheets = ["_app/immutable/assets/SvelteToast.DbLvtVfH.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=17--dAHfY-f.js.map
