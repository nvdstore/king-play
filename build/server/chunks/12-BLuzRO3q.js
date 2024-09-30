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
const imports = ["_app/immutable/nodes/12.DFM6wN0t.js","_app/immutable/chunks/scheduler.BBfqLarD.js","_app/immutable/chunks/index.BP6FsQ8L.js","_app/immutable/chunks/stores.D2EpS8_z.js","_app/immutable/chunks/entry.BDPKqPHQ.js","_app/immutable/chunks/index.CKUPByak.js","_app/immutable/chunks/transaction-list.CXP5QEyW.js","_app/immutable/chunks/each.DxWbBfWu.js","_app/immutable/chunks/formatter.1SswtO-0.js","_app/immutable/chunks/empty-table.1_ixIu_F.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.CFj6iOEW.js","_app/immutable/chunks/clock.Cw3wKIDg.js"];
const stylesheets = ["_app/immutable/assets/12.4UcaflNZ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-BLuzRO3q.js.map
