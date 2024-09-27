import { c as create_ssr_component, s as subscribe, a as escape, b as add_attribute, e as each, v as validate_component } from './ssr-D8vzeGmv.js';
import './SvelteToast.svelte_svelte_type_style_lang-B0BWDvec.js';
import 'sweetalert2';
import './client-BUusD8wq.js';
import { n as navigating } from './stores-Cwz-jE6o.js';
import { c as currency } from './formatter-xDj28_d0.js';
import { s as showLoader } from './general-P-PUF6Mh.js';
import { S as Search, X } from './x-DCoVFTCk.js';
import { I as Icon } from './Icon-6B7qrYG7.js';
import './index2-C-p3-SGJ.js';
import './exports-BGi7-Rnc.js';

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
  let $$unsubscribe_showLoader;
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_showLoader = subscribe(showLoader, (value) => value);
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { data } = $$props;
  let form;
  let submitForm;
  let selectedProduct = data.selectedProduct;
  let searchValue = "";
  let selectedGroupChannel = null;
  let selectedChannel = null;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  filteredProducts = searchValue.length > 0 ? data.products.filter((val) => val.name.toLowerCase().includes(searchValue.toLowerCase())) : data.products;
  $$unsubscribe_showLoader();
  $$unsubscribe_navigating();
  return `<div class="flex flex-col md:flex-row items-start gap-6"><main class="${escape(data.theme.card, true) + " w-full"}"><div class="${"flex items-start p-4 gap-6 " + escape(data.theme.bgColor, true) + " border-b " + escape(data.theme.border, true) + " rounded-t-lg sticky top-[4.5rem] z-10 bg-opacity-75 backdrop-blur-md"}"><img${add_attribute("src", data.game.image, 0)} class="w-[72px] aspect-square rounded-lg" alt=""> <div><p class="text-sm opacity-50" data-svelte-h="svelte-1g9ct0t">Topup Games</p> <h4 class="text-3xl font-bold">${escape(data.game.name)}</h4></div></div> <form method="post" data-sveltekit-keepfocus data-sveltekit-noscroll class="space-y-8 p-4 py-6"${add_attribute("this", submitForm, 0)}><div class="w-full flex items-start gap-6"><h1 class="font-bold text-4xl opacity-75 w-[40px] text-right hidden md:block" data-svelte-h="svelte-11eubrv">1.</h1> <div class="space-y-4 w-full"><div><h4 class="font-medium"><span class="md:hidden" data-svelte-h="svelte-1j8ht2n">1. </span>Masukkan Game ID ${escape(data.game.name)} Anda</h4> <p class="text-sm opacity-50" data-svelte-h="svelte-ud42bt">Silahkan anda mengisi dengan game ID anda, contoh : 213123123</p></div> ${data.game.fields && data.game.fields?.length > 0 ? `<div class="${"grid " + escape(
    data.game.fields?.length % 2 == 0 ? "md:grid-cols-2" : "",
    true
  ) + " gap-4"}">${each(data.game.fields, (field) => {
    return `${field.type == "dropdown" ? `<select${add_attribute("class", data.theme.input, 0)}${add_attribute("name", field.target, 0)}${add_attribute("placeholder", field.placeholder, 0)} ${field.required ? "required" : ""}>${each(JSON.parse(field.options), (option) => {
      return `<option${add_attribute("value", option.value, 0)}>${escape(option.label)}</option>`;
    })}</select>` : `<input${add_attribute("class", data.theme.input, 0)}${add_attribute("name", field.target, 0)}${add_attribute("placeholder", field.placeholder, 0)} ${field.required ? "required" : ""}>`}`;
  })}</div>` : `<div class="flex items-center gap-4"><input name="id_pelanggan_1" class="${escape(data.theme.input, true) + " flex-1"}" placeholder="Masukkan ID Anda"></div>`}</div></div> <div class="w-full flex items-center space-x-8 flex-1 -ml-13"><div class="w-full flex items-start gap-6"><h1 class="font-bold text-4xl opacity-75 w-[40px] text-right hidden md:block" data-svelte-h="svelte-s8aqsc">2.</h1> <div class="space-y-4 w-full"><div data-svelte-h="svelte-1uwlvzy"><h4 class="font-medium"><span class="md:hidden">2. </span>Pilih jumlah diamond yang ingin anda beli</h4> <p class="text-sm opacity-50">Pilih berapa banyak yang ingin anda beli</p></div> <div class="space-y-4"><div class="${escape(data.theme.input, true) + " overflow-hidden flex items-center space-x-2 px-3 bg-opacity-50"}"><div class="flex-1">${validate_component(Search, "Search").$$render($$result, { size: 18, class: data.theme.bgColor }, {}, {})}</div> <input type="text" class="bg-transparent outline-none h-10 w-full text-sm" placeholder="Cari produk"${add_attribute("value", searchValue, 0)}> ${searchValue.length > 0 ? `<button type="button">${validate_component(X, "X").$$render($$result, { size: 18, class: data.theme.bgColor }, {}, {})}</button>` : ``}</div> <div class="space-y-2"><h4 class="text-sm opacity-50">${escape(searchValue.length > 0 ? `Pencarian produk: ${searchValue}` : `Semua Produk (${filteredProducts.length})`)}</h4> <div class="grid grid-cols-3 gap-2">${each(
    filteredProducts.splice(0, 9) ?? [],
    (product) => {
      return `<button type="button" class="${"flex flex-col items-center gap-2 cursor-pointer h-auto p-2 " + escape(!product.isActive ? "opacity-50" : "", true) + " " + escape(
        selectedProduct?.id != product.id ? data.theme.cardButton : `${data.theme.cardButtonActive} border border-${data.color}-500`,
        true
      )}"><img src="https://api.duniagames.co.id/api/product/upload/image/10519365491555755415.png" alt="icon"> <span class="text-sm line-clamp-2">${escape(product.name)}</span> </button>`;
    }
  )}</div></div> ${filteredProducts.length >= 9 ? `<button type="button" class="flex items-center justify-center w-full text-sm gap-1"><span>${escape("Tampilkan Semua Produk")}</span> ${`${validate_component(Chevron_down, "ChevronDown").$$render($$result, { size: 24 }, {}, {})}`}</button>` : ``}</div></div></div></div> <div class="w-full flex items-start gap-6"><h1 class="font-bold text-4xl opacity-75 w-[40px] text-right hidden md:block" data-svelte-h="svelte-1h93cgd">3.</h1> <div class="space-y-4 w-full"><div data-svelte-h="svelte-mbvd56"><h4 class="font-medium"><span class="md:hidden">3. </span>Pilih Metode Pembayaran</h4> <p class="text-sm opacity-50">Silahkan Pilih Metode Bayar</p></div> <div class="space-y-2">${each(data.channels, (group) => {
    return `<div class="${escape(data.theme.cardButton, true) + " w-full px-0 " + escape($navigating ? "opacity-60 pointer-events-none" : "", true)}"><button type="button" class="flex items-center justify-between gap-2 text-sm p-4 w-full cursor-pointer" ${($navigating ? true : false) ? "disabled" : ""}><div class="flex items-center gap-2">${group.type == "EWALLET" ? `${validate_component(Wallet, "Wallet").$$render($$result, { size: 20 }, {}, {})}` : `${group.type == "BANK" ? `${validate_component(Landmark, "Landmark").$$render($$result, { size: 20 }, {}, {})}` : ``}`} <p class="font-medium">${escape(group.label)}</p></div> ${selectedGroupChannel?.id != group.id ? `${validate_component(Chevron_down, "ChevronDown").$$render($$result, { size: 20 }, {}, {})}` : `${validate_component(Chevron_up, "ChevronUp").$$render($$result, { size: 20 }, {}, {})}`}</button> ${selectedGroupChannel?.id == group.id ? `<div class="${"p-2 border-t space-y-2 " + escape(data.theme.border, true)}">${each(group.channels, (channel) => {
      return `<button type="button" class="${"flex items-center justify-between w-full p-2 rounded-md " + escape(
        selectedChannel?.id != channel.id ? data.theme.cardButton : `${data.theme.cardButtonActive} border border-${data.color}-500`,
        true
      )}"><div class="flex items-center gap-3"><div class="bg-white p-1 rounded-md"><img${add_attribute("src", channel.image, 0)} class="w-20 h-5 object-scale-down"${add_attribute("alt", channel.name, 0)}></div> <p class="text-sm">${escape(channel.name)}</p></div> <div class="${"font-semibold text-" + escape(data.color, true) + "-500"}">${escape(channel.price ? currency(channel.price) : "")}</div> </button>`;
    })} </div>` : ``} <button type="button" class="${"flex items-center justify-end border-t " + escape(data.theme.border, true) + " px-4 py-2 w-full"}"><div class="flex items-center gap-1">${each(group.images, (img) => {
      return `<div class="bg-neutral-50 rounded-md p-1"><img${add_attribute("src", img, 0)} class="w-20 h-4 object-scale-down" alt="payment-channel"> </div>`;
    })} </div></button> </div>`;
  })}</div></div></div></form> <form class="hidden" data-sveltekit-noscroll data-sveltekit-keepfocus${add_attribute("this", form, 0)}><input type="hidden" name="product"${add_attribute("value", selectedProduct?.id, 0)}></form></main> <aside class="w-full md:w-[600px] sticky top-24 space-y-6"><div class="${escape(data.theme.card, true) + " p-4 space-y-2"}"><div><div class="py-2"><span class="text-sm bg-opacity-50" data-svelte-h="svelte-vs0kag">Game:</span> <p class="font-medium">${escape(data.game.name)}</p></div> <div class="py-2"><span class="text-sm bg-opacity-50" data-svelte-h="svelte-f517ej">Produk:</span> <p class="font-medium">${escape(selectedProduct?.name ?? "-")}</p></div> <div class="py-2"><span class="text-sm bg-opacity-50" data-svelte-h="svelte-oohefg">Metode Pembayaran:</span> <div class="flex items-center space-x-2">${``} <p class="font-medium">${escape("-")}</p></div></div> ${``}</div> <button class="btn btn-red w-full" data-svelte-h="svelte-vlgpxc">Bayar Sekarang</button></div> ${``}</aside></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CI_Yeu1L.js.map
