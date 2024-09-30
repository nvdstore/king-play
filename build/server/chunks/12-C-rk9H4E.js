import { g as getTransactions } from './transactions-CwiM9J0u.js';
import './db-Dt_6_ZQU.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';
import 'date-fns';

const load = async ({ locals, url }) => {
  const session = await locals.auth();
  const limit = 10;
  const page = url.searchParams.get("page") ? Number(url.searchParams.get("page")) : 1;
  const { count, data: transactions } = await getTransactions({
    idMember: session?.user?.id?.toString(),
    startDate: /* @__PURE__ */ new Date(),
    endDate: /* @__PURE__ */ new Date(),
    limit,
    offset: limit * page
  });
  return {
    transactions,
    total: count,
    limit
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D9UCrfFJ.js')).default;
const server_id = "src/routes/(member)/(dashboard)/dashboard/+page.server.ts";
const imports = ["_app/immutable/nodes/12.DVr0S_-m.js","_app/immutable/chunks/scheduler.6KT2eGMr.js","_app/immutable/chunks/index.B8s6-p5L.js","_app/immutable/chunks/stores.D3HUAG9M.js","_app/immutable/chunks/entry.D_G1TyTl.js","_app/immutable/chunks/index.B4FbLfrC.js","_app/immutable/chunks/transaction-list.SQkqw0Q2.js","_app/immutable/chunks/each.MhIJo3BG.js","_app/immutable/chunks/formatter.1SswtO-0.js","_app/immutable/chunks/empty-table.Zd2yH4ik.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.QrzoY6PX.js","_app/immutable/chunks/clock.BoAt_lwG.js"];
const stylesheets = ["_app/immutable/assets/12.4UcaflNZ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-C-rk9H4E.js.map
