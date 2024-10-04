import { d as db } from './db-Dt_6_ZQU.js';
import { format } from 'date-fns';

async function getTransactions(params) {
  const startDate = format(params.startDate ?? /* @__PURE__ */ new Date(), "yyyy-MM-dd");
  const endDate = format(params.endDate ?? /* @__PURE__ */ new Date(), "yyyy-MM-dd");
  const values = [params.idMember, startDate, endDate, params.limit, params.offset];
  let where = "";
  if (params.search && params.search != "") {
    where += " and (cast(id_transaksi as varchar) ilike $6 or nama_group_produk ilike $6 or produk ilike $6) ";
    values.push(`%${params.search}%`);
  }
  if (params.status == "waiting") {
    where += " and (coalesce(i.status::int, 0) = 0 or coalesce(i.flag::int, 0) = 0) ";
  } else if (params.status == "pending") {
    where += " and (coalesce(i.status::int, 0) = 2 and coalesce(i.flag::int, 0) = 1 and t.response_code <> '00')";
  } else if (params.status == "success") {
    where += " and (coalesce(i.status::int, 0) = 2 and coalesce(i.flag::int, 0) = 1 and t.response_code = '00')";
  }
  const query = `select count(*) OVER() AS full_count, t.id_transaksi, t.id_member, i.id_invoice, t.nominal, t.response_code, t.transaction_date, 
		mgp.nama_group_produk, mp.produk, i.status, i.flag 
    from transaksi t
		left join invoice i on i.id_invoice = t.id_invoice 
    left join mt_produk mp on mp.id_produk = t.id_produk 
    left join mt_group_produk mgp on mgp.id_group_produk = mp.id_group_produk
    where t.id_member = $1 and transaction_date between $2 and $3 ${where}
    order by transaction_date desc, transaction_time desc limit $4 offset $5`;
  const result = await db.query(query, values);
  const data = result?.rows && result?.rows.length > 0 ? result?.rows : [];
  const transactions = data.map((trx) => {
    const statusTrx = trx.response_code;
    const statusInvoice = trx.status;
    const flagInvoice = trx.flag;
    let status = "waiting";
    if (statusInvoice == 2 && flagInvoice == 1) {
      if (statusTrx == "00") {
        status = "success";
      } else {
        status = "pending";
      }
    }
    return {
      idTransaksi: trx.id_transaksi,
      idMember: trx.id_member,
      idInvoice: trx.id_invoice,
      groupProduk: trx.nama_group_produk,
      produk: trx.produk,
      nominal: trx.nominal,
      tanggal: format(trx.transaction_date, "yyyy-MM-dd"),
      status
    };
  });
  return {
    data: transactions,
    count: data[0]?.full_count ?? 0
  };
}
async function getResumeTrx(idMember) {
  const now = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
  let statusses = ["waiting", "pending", "success", "totalnum"];
  let data = {};
  for (let id = 0; id < statusses.length; id++) {
    const status = statusses[id];
    let where = "";
    if (status == "waiting") {
      where = " and (coalesce(i.status::int, 0) = 0 or coalesce(i.flag::int, 0) = 0) ";
    } else if (status == "pending") {
      where = " and (coalesce(i.status::int, 0) = 2 and coalesce(i.flag::int, 0) = 1 and t.response_code <> '00')";
    } else if (status == "success") {
      where = " and (coalesce(i.status::int, 0) = 2 and coalesce(i.flag::int, 0) = 1 and t.response_code = '00')";
    }
    const query = `select count(*) as total, sum(nominal) as total_nominal from transaksi t
		left join invoice i on i.id_invoice = t.id_invoice 
    where t.id_member = $1 and transaction_date = $2 ${where}`;
    const result = await db.query(query, [idMember, now]);
    if (status == "totalnum") {
      Object.assign(data, { totalnum: result?.rows[0]?.total_nominal ?? 0 });
    } else {
      Object.assign(data, {
        [status]: result?.rows[0]?.total ?? 0
      });
    }
  }
  return { ...data };
}

export { getResumeTrx as a, getTransactions as g };
//# sourceMappingURL=transactions-CPciDDPa.js.map
