import { e as error } from './index-DzcLzHBX.js';
import { g as getClientIp, B as BASE_API_URL } from './request-NgL59NDw.js';
import { addDays } from 'date-fns';
import { U as User } from './user-D-QeBYML.js';
import 'fs';
import 'crypto';
import 'nanoid';
import './db-ooFhjDSf.js';
import './environment-DWgAsK3Q.js';
import 'pg';

const themes = {
  dark: {
    main: "bg-gradient-to-b from-slate-800 to-slate-900 text-neutral-50",
    nav: "bg-gradient-to-b from-slate-700/75 to-slate-800/75 border-b border-slate-700 backdrop-blur-md",
    footer: "border-t border-slate-700",
    bgColor: "bg-slate-800",
    bgColorSecondary: "bg-slate-700/75",
    color: "text-neutral-50",
    border: "border-slate-600",
    button: "btn btn-slate",
    input: "px-2.5 h-10 bg-slate-700/50 border border-slate-600 focus:border-slate-600 rounded-lg outline-none text-sm",
    card: "bg-slate-800 border border-slate-700 rounded-xl",
    cardButton: "bg-slate-700/50 border border-slate-600 rounded-lg outline-none",
    cardButtonActive: "bg-slate-700/75 rounded-lg outline-none transition-all"
  },
  light: {
    main: "bg-neutral-50 text-slate-800",
    nav: "bg-neutral-100/75 border-b border-neutral-200 backdrop-blur-md",
    bgColor: "bg-neutral-100",
    bgColorSecondary: "bg-neutral-200",
    color: "text-slate-800",
    border: "border-neutral-300",
    button: "btn btn-slate text-neutral-50",
    input: "px-2.5 h-10 bg-neutral-100/75 border border-neutral-300 focus:border-neutral-400 rounded-lg outline-none text-sm",
    card: "bg-neutral-100/75 border border-neutral-200 rounded-xl",
    cardButton: "border border-neutral-300 rounded-lg outline-none text-sm",
    cardButtonActive: "rounded-lg outline-none text-sm"
  }
};
const ID_MASTER = "1000001";
const UUID_KEY = "uuid";
const load = async ({ fetch, url, cookies, request }) => {
  let userId = cookies.get(UUID_KEY);
  if (!userId) {
    const ip = await getClientIp();
    const expires = addDays(/* @__PURE__ */ new Date(), 1);
    userId = crypto.randomUUID();
    const { data: data2, error: error2 } = await User.createSession({
      userId: ID_MASTER,
      sessionToken: userId,
      expires,
      type: "user",
      ip,
      deviceInfo: request.headers.get("user-agent") ?? ""
    });
    if (error2 == null) {
      cookies.set(UUID_KEY, userId, {
        path: "/",
        secure: true,
        expires,
        httpOnly: true
      });
    }
  }
  const getTheme = url.searchParams.get("theme");
  let dataTheme = getTheme ?? "dark";
  let dataColor = "yellow";
  const color = dataColor ?? "";
  const theme = themes[dataTheme ?? "dark"];
  let games = [];
  const response = await fetch(new URL("/v1.0/api/produk/list-group-produk", BASE_API_URL).href);
  if (!response.ok) {
    throw error(500, `HTTP Error status: ${response.status}`);
  }
  const data = await response.json();
  if (data.response_code != "00") {
    throw error(500, `Error get games: ${data.response_message}`);
  }
  const item = data.response_data;
  if (item.length > 0) {
    games = item.map(
      (game) => ({
        id: game.id_group_produk,
        name: game.nama_group_produk,
        image: game.img,
        slug: game.slug
      })
    );
  }
  const popularGames = games.slice(0, 3);
  return {
    color,
    theme,
    games,
    popularGames
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-Bgi1GVby.js')).default;
const server_id = "src/routes/(homepage)/+layout.server.ts";
const imports = ["_app/immutable/nodes/5.DyzyAsbO.js","_app/immutable/chunks/scheduler.BocGr1Ux.js","_app/immutable/chunks/index.BQZXa2CZ.js","_app/immutable/chunks/each.Tt0-nXae.js","_app/immutable/chunks/index.D13n4St3.js","_app/immutable/chunks/swiper-element-bundle.DIkDjTNm.js","_app/immutable/chunks/general.CBk7dzIs.js","_app/immutable/chunks/index.Ark2ieeu.js","_app/immutable/chunks/crown.B8uIPv2p.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.Beuh8PMk.js","_app/immutable/chunks/x.jKoFK2CW.js"];
const stylesheets = ["_app/immutable/assets/5.B5i__Hu-.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-IrxAUwfQ.js.map
