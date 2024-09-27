import { c as create_ssr_component, a as escape, v as validate_component, b as add_attribute } from './ssr-D8vzeGmv.js';
import { c as currency } from './formatter-xDj28_d0.js';
import { format } from 'date-fns';
import { I as Icon } from './Icon-6B7qrYG7.js';
import { C as Clock } from './clock-C_DfCGFm.js';

const Check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "check" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const invoice = data.invoice;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div class="${"" + escape(data.theme.card, true)}"><div class="flex flex-col items-center justify-center space-y-6 px-5 py-10 text-center">${data.status == 4 ? `${validate_component(Check, "Check").$$render($$result, { size: 48 }, {}, {})} <h4 class="text-2xl font-medium" data-svelte-h="svelte-o9poc">Pembayaran Berhasil</h4>` : `${validate_component(Clock, "Clock").$$render($$result, { size: 48 }, {}, {})} <h4 class="text-2xl font-medium">${escape(data.flag)}</h4> <div><h4 class="${"font-bold text-4xl text-" + escape(data.color, true) + "-500"}">${escape(currency(invoice.total))}</h4> <p class="text-sm opacity-75" data-svelte-h="svelte-1bqkdb4">Total Bayar</p></div> <div class="space-y-4"><a${add_attribute("href", invoice.checkoutUrl, 0)} target="_blank" class="btn btn-red uppercase">Selesaikan Pembayaran</a> <div><p class="text-sm opacity-75" data-svelte-h="svelte-169s63z">Selesaikan pemabayaran sebelum:</p> <p class="font-medium">${escape(format(invoice.timeLimit, "dd LLL yyyy hh:mm:ss "))}</p></div> <p class="text-xs">ID Invoice: ${escape(invoice.idInvoice)} • Reff: ${escape(invoice.idInquiry)}</p></div>`}</div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BeQ3I42m.js.map
