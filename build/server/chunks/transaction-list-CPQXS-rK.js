import { c as create_ssr_component, q as createEventDispatcher, e as each, a as escape, v as validate_component } from './ssr-D8vzeGmv.js';
import { c as currency } from './formatter-xDj28_d0.js';
import { T as TransactionStatus } from './constant-CVq9EQOr.js';
import { E as Empty_table } from './empty-table-BxjAhhi3.js';
import { C as Chevron_left, a as Chevron_right } from './chevron-right-CDoCK1lu.js';

const Transaction_list = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { data = [] } = $$props;
  let { limit = 25 } = $$props;
  let { total = 0 } = $$props;
  let { pageNum = 1 } = $$props;
  function getTrxStatus(key) {
    const status = TransactionStatus.find((val) => val.key == key) ?? null;
    return `<span class="${status?.class}">${status?.value}</span>`;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.limit === void 0 && $$bindings.limit && limit !== void 0) $$bindings.limit(limit);
  if ($$props.total === void 0 && $$bindings.total && total !== void 0) $$bindings.total(total);
  if ($$props.pageNum === void 0 && $$bindings.pageNum && pageNum !== void 0) $$bindings.pageNum(pageNum);
  if ($$props.getTrxStatus === void 0 && $$bindings.getTrxStatus && getTrxStatus !== void 0) $$bindings.getTrxStatus(getTrxStatus);
  return `<div class="overflow-x-auto border border-neutral-700 rounded-lg"><table class="min-w-full"><thead data-svelte-h="svelte-iaekdm"><th>Invoice Number</th> <th class="hidden lg:table-cell">ID Transaksi</th> <th class="hidden lg:table-cell">Produk</th> <th>Harga</th> <th class="hidden md:table-cell">Tanggal</th> <th>Status</th></thead> <tbody>${data.length > 0 ? `${each(data, (item) => {
    return `<tr><td>${escape(item.idInvoice ?? "-")} <dl class="lg:hidden mt-2"><dt>#${escape(item.idTransaksi)}</dt><dt class="mb-1">${escape(item.produk)}</dt><dt class="md:hidden text-xs text-neutral-400">Tgl: ${escape(item.tanggal)}</dt></dl></td> <td class="hidden lg:table-cell">${escape(item.idTransaksi)}</td> <td class="hidden lg:table-cell">${escape(item.groupProduk)}<br>${escape(item.produk)}</td> <td>${escape(currency(item.nominal))}</td> <td class="hidden md:table-cell">${escape(item.tanggal)}</td> <td><!-- HTML_TAG_START -->${getTrxStatus(item.status ?? "")}<!-- HTML_TAG_END --></td> </tr>`;
  })}` : `<tr><td colspan="6">${validate_component(Empty_table, "EmptyTable").$$render($$result, { description: "Belum ada data transaksi" }, {}, {})}</td></tr>`}</tbody></table> ${data.length > 0 ? `<div class="flex items-center justify-between px-6 py-2 border-t border-t-neutral-700"><span class="text-xs text-neutral-400">Menampilkan data ${escape(limit)} dari ${escape(total)}</span> <div class="flex items-center space-x-2"><button class="p-2 rounded-full hover:bg-neutral-700 transition-all">${validate_component(Chevron_left, "ChevronLeft").$$render($$result, { size: 18 }, {}, {})}</button> <div class="px-2">${escape(pageNum)}</div> <button class="p-2 rounded-full hover:bg-neutral-700 transition-all">${validate_component(Chevron_right, "ChevronRight").$$render($$result, { size: 18 }, {}, {})}</button></div></div>` : ``}</div>`;
});

export { Transaction_list as T };
//# sourceMappingURL=transaction-list-CPQXS-rK.js.map
