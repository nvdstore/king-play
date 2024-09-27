import { d as db } from './db-ooFhjDSf.js';

async function getStoreByMember(memberId) {
  const res = await db.query(
    "select * from mt_store s left join mt_store_info msi on msi.id_store = s.id where id_member = $1",
    [memberId]
  );
  return res.rows[0] ?? null;
}
async function createStore(data) {
  try {
    const res = await db.query(
      "insert into mt_store (id_member, name, description, email, phone, domain) values ($1, $2, $3, $4, $5, $6) returning id",
      [data.memberId, data.name, data.description, data.email, data.phone, data.domain]
    );
    return {
      error: null,
      data: res.rows[0] ?? null
    };
  } catch (error) {
    console.log(error);
    if (error.code == 23505) {
      return {
        error: "Domain sudah terdaftar",
        data: null
      };
    }
    return {
      error: "Terjadi kesalahan",
      data: null
    };
  }
}

export { createStore as c, getStoreByMember as g };
//# sourceMappingURL=store-BuyiZMLa.js.map
