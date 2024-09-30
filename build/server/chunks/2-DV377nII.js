import { r as redirect } from './index-DzcLzHBX.js';
import { g as getStoreByMember } from './store-DkaSSJZX.js';
import './db-BEDA57LU.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';

const load = async ({ locals, url }) => {
  const session = await locals.auth();
  const pathname = url.pathname;
  const host = url.hostname;
  if (host != "localhost" && host != "kingplay.id") {
    redirect(307, "/");
  }
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding")) {
    if (!session?.user) {
      return redirect(307, "/auth/login");
    }
    const store = await getStoreByMember(session.user.id);
    if (!pathname.startsWith("/onboarding") && !store) {
      return redirect(307, "/onboarding");
    } else if (pathname.startsWith("/onboarding") && store) {
      return redirect(307, "/dashboard");
    }
  }
  if (pathname.startsWith("/auth") && session?.user) {
    return redirect(307, "/dashboard");
  }
  return {
    session
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-wFwvF7CN.js')).default;
const server_id = "src/routes/(dashboard)/+layout.server.ts";
const imports = ["_app/immutable/nodes/2.D3NGmq9S.js","_app/immutable/chunks/scheduler.4YBzcwTj.js","_app/immutable/chunks/index.BNFUcRFq.js"];
const stylesheets = ["_app/immutable/assets/2.Cp17vnk4.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-DV377nII.js.map
