import { g as getTransactions } from './transactions-wgDdTj-f.js';
import './db-BEDA57LU.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';
import 'date-fns';

const load = async ({ locals, url }) => {
  const session = await locals.auth();
  const defaultLimit = 10;
  const startDate = url.searchParams.get("start") ? new Date(url.searchParams.get("start")?.toString()) : /* @__PURE__ */ new Date();
  const endDate = url.searchParams.get("end") ? new Date(url.searchParams.get("end")?.toString()) : /* @__PURE__ */ new Date();
  const status = url.searchParams.get("status") ?? "all";
  const search = url.searchParams.get("search") ?? "";
  const limit = url.searchParams.get("limit") ? Number(url.searchParams.get("limit")) : defaultLimit;
  const page = url.searchParams.get("page") ? Number(url.searchParams.get("page")) : 1;
  const { count, data: transactions } = await getTransactions({
    idMember: session?.user?.id?.toString(),
    startDate,
    endDate,
    limit,
    offset: page * limit,
    search,
    status
  });
  return {
    transactions,
    count,
    defaultLimit
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 13;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-gBLuKi9e.js')).default;
const server_id = "src/routes/(dashboard)/dashboard/history/+page.server.ts";
const imports = ["_app/immutable/nodes/13.Bqx-cTr-.js","_app/immutable/chunks/scheduler.BocGr1Ux.js","_app/immutable/chunks/index.BQZXa2CZ.js","_app/immutable/chunks/each.Tt0-nXae.js","_app/immutable/chunks/stores.CgS3dSC8.js","_app/immutable/chunks/entry.dZgwb6_u.js","_app/immutable/chunks/index.Ark2ieeu.js","_app/immutable/chunks/datepicker.D0MGQ4Z3.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.Beuh8PMk.js","_app/immutable/chunks/format.cwXK75ha.js","_app/immutable/chunks/transaction-list.CZ-sOykD.js","_app/immutable/chunks/formatter.1SswtO-0.js","_app/immutable/chunks/empty-table.Cqbafzp5.js"];
const stylesheets = ["_app/immutable/assets/datepicker.CPeZy3ku.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=13-9as_-F_B.js.map
