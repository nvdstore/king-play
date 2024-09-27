import { c as create_ssr_component, s as subscribe, b as add_attribute, v as validate_component, e as each, a as escape } from './ssr-D8vzeGmv.js';
import { format } from 'date-fns';
import { p as page } from './stores-Cwz-jE6o.js';
import { D as Datepicker, C as Cloud_download } from './datepicker-BoJtjwTJ.js';
import { T as TransactionStatus } from './constant-CVq9EQOr.js';
import { T as Transaction_list } from './transaction-list-CMeHFmjo.js';
import './client-BUusD8wq.js';
import './exports-BGi7-Rnc.js';
import './Icon-6B7qrYG7.js';
import './formatter-xDj28_d0.js';
import './empty-table-CuEobDfe.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let startDate = $page.url.searchParams.get("start") ?? format(
    /* @__PURE__ */ new Date(),
    "yyyy-MM-dd"
  );
  let endDate = $page.url.searchParams.get("end") ?? format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
  let limit = $page.url.searchParams.get("limit")?.toString() ? Number($page.url.searchParams.get("limit")?.toString()) : data.defaultLimit;
  let pageNum = $page.url.searchParams.get("page")?.toString() ? Number($page.url.searchParams.get("page")?.toString()) : 1;
  $page.url.searchParams.get("status") ?? "all";
  let search = $page.url.searchParams.get("search") ?? "";
  let form;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<section class="space-y-4"><header class="space-y-1" data-svelte-h="svelte-1kp1tg4"><h2 class="text-xl font-bold">Riwayat Transaksi</h2> <p class="text-sm">Menampilkan data riwayat transaksi yang telah Anda lakukan selama periode yang dipilih.</p></header> <form data-sveltekit-keepfocus data-sveltekit-noscroll class="space-y-4"${add_attribute("this", form, 0)}><div class="grid md:grid-cols-3 gap-4 md:bg-neutral-800 md:border md:border-neutral-700 md:p-4 md:rounded-lg">${validate_component(Datepicker, "Datepicker").$$render(
      $$result,
      {
        label: "Pilih Tanggal",
        isRange: true,
        startDate,
        endDate
      },
      {
        startDate: ($$value) => {
          startDate = $$value;
          $$settled = false;
        },
        endDate: ($$value) => {
          endDate = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="input-group"><label for="status" class="input-label" data-svelte-h="svelte-35wqu0">Status Transaksi</label> <select name="status" class="input"><option value="all" data-svelte-h="svelte-1q14tng">Semua Transaksi</option>${each(TransactionStatus, (item) => {
      return `<option${add_attribute("value", item.key, 0)}>${escape(item.value)}</option>`;
    })}</select></div> <div class="input-group"><label for="search" class="input-label" data-svelte-h="svelte-5eq6ht">Pencarian</label> <input type="text" class="input" name="search" placeholder="Cari data transaksi"${add_attribute("value", search, 0)}></div></div> <div class="flex items-center space-x-4"><select name="limit" class="input"><option${add_attribute("value", 10, 0)} data-svelte-h="svelte-3wz2zm">10 Entries</option><option${add_attribute("value", 25, 0)} data-svelte-h="svelte-j5694m">25 Entries</option><option${add_attribute("value", 50, 0)} data-svelte-h="svelte-cekbdm">50 Entries</option><option${add_attribute("value", 100, 0)} data-svelte-h="svelte-nb6ml6">100 Entries</option></select> <button class="btn">${validate_component(Cloud_download, "DownloadCloud").$$render($$result, { size: 18, class: "md:mr-2" }, {}, {})} <span class="hidden md:block" data-svelte-h="svelte-1rn18gm">Ekspor ke XLSX</span></button></div> <input type="hidden" name="start"${add_attribute("value", startDate, 0)}> <input type="hidden" name="end"${add_attribute("value", endDate, 0)}> <input type="hidden" name="page"${add_attribute("value", pageNum, 0)}></form> ${validate_component(Transaction_list, "TransactionList").$$render(
      $$result,
      {
        data: data.transactions,
        limit: Number(limit),
        total: data.count,
        pageNum
      },
      {},
      {}
    )}</section>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-gBLuKi9e.js.map
