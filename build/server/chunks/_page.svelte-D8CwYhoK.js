import { c as create_ssr_component, a as escape, b as add_attribute, v as validate_component, e as each } from './ssr-CY05hr6B.js';
import { c as currency } from './formatter-xDj28_d0.js';
import { S as Search, X } from './x-bEBUkFuQ.js';
import { I as Icon } from './Icon-DBe1eK66.js';

const Chevron_down = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-down" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Chevron_up = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m18 15-6-6-6 6" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-up" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Landmark = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "3",
        "x2": "21",
        "y1": "22",
        "y2": "22"
      }
    ],
    [
      "line",
      {
        "x1": "6",
        "x2": "6",
        "y1": "18",
        "y2": "11"
      }
    ],
    [
      "line",
      {
        "x1": "10",
        "x2": "10",
        "y1": "18",
        "y2": "11"
      }
    ],
    [
      "line",
      {
        "x1": "14",
        "x2": "14",
        "y1": "18",
        "y2": "11"
      }
    ],
    [
      "line",
      {
        "x1": "18",
        "x2": "18",
        "y1": "18",
        "y2": "11"
      }
    ],
    ["polygon", { "points": "12 2 20 7 4 7" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "landmark" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Wallet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"
      }
    ],
    [
      "path",
      {
        "d": "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "wallet" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredProducts;
  let { data } = $$props;
  let selectedProduct;
  let searchValue = "";
  let selectedGroupChannel = null;
  let selectedChannel = null;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  filteredProducts = searchValue.length > 0 ? data.products.filter((val) => val.name.toLowerCase().includes(searchValue.toLowerCase())) : data.products;
  return `<div class="flex items-start gap-6"><main class="${escape(data.theme.card, true) + " w-full"}"><div class="${"flex items-start p-4 gap-6 " + escape(data.theme.bgColor, true) + " border-b " + escape(data.theme.border, true) + " rounded-t-lg sticky top-[4.5rem] z-10 bg-opacity-75 backdrop-blur-md"}"><img${add_attribute("src", data.game.image, 0)} class="w-[72px] aspect-square rounded-lg" alt=""> <div><p class="text-sm opacity-50" data-svelte-h="svelte-1g9ct0t">Topup Games</p> <h4 class="text-3xl font-bold">${escape(data.game.name)}</h4></div></div> <div class="space-y-8 p-4 py-6"><div class="w-full flex items-start gap-6"><h1 class="font-bold text-4xl opacity-50 w-[40px] text-right" data-svelte-h="svelte-5cda14">1.</h1> <div class="space-y-4 w-full"><div data-svelte-h="svelte-2kti5y"><h4 class="font-medium">Masukkan Game ID Mobile Legends Anda</h4> <p class="text-sm opacity-50">Silahkan anda mengisi dengan game ID anda, contoh : 213123123</p></div> <div class="flex items-center gap-4"><input class="${escape(data.theme.input, true) + " flex-1"}" placeholder="Masukkan ID Anda"> <input class="${escape(data.theme.input, true) + " flex-4"}" placeholder="ID Zona"></div></div></div> <div class="w-full flex items-center space-x-8 flex-1 -ml-13"><div class="w-full flex items-start gap-6"><h1 class="font-bold text-4xl opacity-50 w-[40px] text-right" data-svelte-h="svelte-1b1aegr">2.</h1> <div class="space-y-4 w-full"><div data-svelte-h="svelte-19krk9k"><h4 class="font-medium">Pilih jumlah diamond yang ingin anda beli</h4> <p class="text-sm opacity-50">Pilih berapa banyak yang ingin anda beli</p></div> <div class="space-y-4"><div class="${escape(data.theme.input, true) + " overflow-hidden flex items-center space-x-2 px-3 bg-opacity-50"}"><div class="flex-1">${validate_component(Search, "Search").$$render($$result, { size: 18, class: data.theme.bgColor }, {}, {})}</div> <input type="text" class="bg-transparent outline-none h-10 w-full text-sm" placeholder="Cari produk"${add_attribute("value", searchValue, 0)}> ${searchValue.length > 0 ? `<button>${validate_component(X, "X").$$render($$result, { size: 18, class: data.theme.bgColor }, {}, {})}</button>` : ``}</div> <div class="space-y-2"><h4 class="text-sm opacity-50">${escape(searchValue.length > 0 ? `Pencarian produk: ${searchValue}` : "Semua Produk")}</h4> <div class="grid grid-cols-3 gap-2">${each(filteredProducts, (product) => {
    return `<button class="${"flex flex-col items-center gap-2 cursor-pointer h-auto p-2 " + escape(
      selectedProduct?.id != product.id ? data.theme.cardButton : `${data.theme.cardButtonActive} border border-${data.color}-500`,
      true
    )}"><img src="https://api.duniagames.co.id/api/product/upload/image/10519365491555755415.png" alt="icon"> <span class="text-sm line-clamp-2">${escape(product.name)}</span> </button>`;
  })}</div></div></div></div></div></div> <div class="w-full flex items-start gap-6"><h1 class="font-bold text-4xl opacity-50 w-[40px] text-right" data-svelte-h="svelte-1hbf8by">3.</h1> <div class="space-y-4 w-full"><div data-svelte-h="svelte-1eheh9h"><h4 class="font-medium">Pilih Metode Pembayaran</h4> <p class="text-sm opacity-50">Silahkan Pilih Metode Bayar</p></div> <div class="space-y-2">${each(data.channels, (group) => {
    return `<div class="${escape(data.theme.cardButton, true) + " w-full px-0"}"><button class="flex items-center justify-between gap-2 text-sm p-4 w-full cursor-pointer"><div class="flex items-center gap-2">${group.type == "EWALLET" ? `${validate_component(Wallet, "Wallet").$$render($$result, { size: 20 }, {}, {})}` : `${group.type == "BANK" ? `${validate_component(Landmark, "Landmark").$$render($$result, { size: 20 }, {}, {})}` : ``}`} <p class="font-medium">${escape(group.label)}</p></div> ${selectedGroupChannel?.id != group.id ? `${validate_component(Chevron_down, "ChevronDown").$$render($$result, { size: 20 }, {}, {})}` : `${validate_component(Chevron_up, "ChevronUp").$$render($$result, { size: 20 }, {}, {})}`}</button> ${selectedGroupChannel?.id == group.id ? `<div class="${"p-2 border-t space-y-2 " + escape(data.theme.border, true)}">${each(group.channels, (channel) => {
      return `<button class="${"flex items-center justify-between w-full p-2 rounded-md " + escape(
        selectedChannel?.id != channel.id ? data.theme.cardButton : `${data.theme.cardButtonActive} border border-${data.color}-500`,
        true
      )}"><div class="flex items-center gap-3"><div class="bg-white p-1 rounded-md"><img${add_attribute("src", channel.image, 0)} class="w-20 h-5 object-scale-down"${add_attribute("alt", channel.name, 0)}></div> <p class="text-sm">${escape(channel.name)}</p></div> <div class="${"font-semibold text-" + escape(data.color, true) + "-500"}">${escape(currency(channel.price))}</div> </button>`;
    })} </div>` : ``} <div class="${"flex items-center justify-end border-t " + escape(data.theme.border, true) + " px-4 py-2"}"><div class="flex items-center gap-1">${each(group.images, (img) => {
      return `<div class="bg-neutral-50 rounded-md p-1"><img${add_attribute("src", img, 0)} class="w-20 h-4 object-scale-down" alt="payment-channel"> </div>`;
    })} </div></div> </div>`;
  })}</div></div></div></div></main> <aside class="${escape(data.theme.card, true) + " p-4 w-[600px] sticky top-24"}"><div class="space-y-4"><div><div class="${"border-b " + escape(data.theme.border, true) + " py-2"}"><span class="text-sm bg-opacity-50" data-svelte-h="svelte-vs0kag">Game:</span> <p class="font-medium">${escape(data.game.name)}</p></div> <div class="${"border-b " + escape(data.theme.border, true) + " py-2"}"><span class="text-sm bg-opacity-50" data-svelte-h="svelte-f517ej">Produk:</span> <p class="font-medium">${escape("-")}</p></div> <div class="py-2"><span class="text-sm bg-opacity-50" data-svelte-h="svelte-oohefg">Metode Pembayaran:</span> <p class="font-medium">${escape("-")}</p></div></div> <button class="btn btn-red w-full" data-svelte-h="svelte-1hk7nmh">Bayar Sekarang</button></div></aside></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-D8CwYhoK.js.map
