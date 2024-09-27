import { g as getTransactions } from './transactions-wgDdTj-f.js';
import './db-BEDA57LU.js';
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

const index = 11;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D9UCrfFJ.js')).default;
const server_id = "src/routes/(dashboard)/dashboard/+page.server.ts";
const imports = ["_app/immutable/nodes/11.BGPFbzHQ.js","_app/immutable/chunks/scheduler.BocGr1Ux.js","_app/immutable/chunks/index.BQZXa2CZ.js","_app/immutable/chunks/stores.DUEVHs2E.js","_app/immutable/chunks/entry.S5W9R4Az.js","_app/immutable/chunks/index.Ark2ieeu.js","_app/immutable/chunks/transaction-list.CZ-sOykD.js","_app/immutable/chunks/each.Tt0-nXae.js","_app/immutable/chunks/formatter.1SswtO-0.js","_app/immutable/chunks/empty-table.Cqbafzp5.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.Beuh8PMk.js","_app/immutable/chunks/clock.Br8RMJJq.js"];
const stylesheets = ["_app/immutable/assets/11.4UcaflNZ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=11-DuEGYT7E.js.map
