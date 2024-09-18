const load = async () => {
  let game = {
    id: 1,
    slug: "mobile-legends",
    name: "Mobile Legends",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/81/1d/2b/811d2b5e-eda1-b4a2-5fd9-1736dd04c9ae/AppIcon-1x_U007emarketing-0-6-0-85-220-0.png/230x0w.webp"
  };
  let products = [
    {
      id: 1,
      name: "3 Diamonds",
      price: 7e3
    },
    {
      id: 2,
      name: "3 Diamonds",
      price: 7e3
    },
    {
      id: 3,
      name: "3 Diamonds",
      price: 7e3
    },
    {
      id: 4,
      name: "3 Diamonds",
      price: 7e3
    }
  ];
  let channels = [
    {
      id: 1,
      label: "E-Wallet",
      type: "EWALLET",
      channels: [
        {
          id: 1,
          code: "SHOPEE",
          image: "https://storage.googleapis.com/tokogame-img/payment-provider/logo-shopeepay.png",
          name: "Shopee",
          price: 2e3
        },
        {
          id: 2,
          code: "GOPAY",
          image: "https://storage.googleapis.com/tokogame-img/payment-provider/logo-gopay.png",
          name: "Gopay",
          price: 2500
        }
      ],
      images: [
        "https://storage.googleapis.com/tokogame-img/payment-provider/logo-shopeepay.png",
        "https://storage.googleapis.com/tokogame-img/payment-provider/logo-gopay.png"
      ]
    },
    {
      id: 2,
      label: "Transfer Bank",
      type: "BANK",
      channels: [
        {
          id: 3,
          code: "BCA",
          image: "https://storage.googleapis.com/tokogame-img/payment-provider/logo-bca.png",
          name: "BCA",
          price: 4200
        }
      ],
      images: ["https://storage.googleapis.com/tokogame-img/payment-provider/logo-bca.png"]
    }
  ];
  return {
    game,
    products,
    channels
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 19;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D8CwYhoK.js')).default;
const server_id = "src/routes/(homepage)/[game]/+page.server.ts";
const imports = ["_app/immutable/nodes/19.gTXXpDUy.js","_app/immutable/chunks/8.D6-lxqIh.js","_app/immutable/chunks/index.qVoW8Mvc.js","_app/immutable/chunks/each.BYqwBxiO.js","_app/immutable/chunks/index.DELV8H0S.js","_app/immutable/chunks/formatter.1SswtO-0.js","_app/immutable/chunks/x.DmcRsZrL.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.DnJzLTTh.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=19-DMGs224l.js.map
