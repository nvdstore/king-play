import { d as db } from './db-Dt_6_ZQU.js';

async function getUserById(id) {
  const res = await db.query("select * from mt_member where id_member = $1", [id]);
  return res.rows[0] ?? null;
}
async function getUserByEmail(email) {
  const res = await db.query("select * from mt_member where email = $1", [email]);
  return res.rows[0] ?? null;
}
async function createUser(data) {
  try {
    const res = await db.query(
      "insert into mt_member (email, email_verified, password, name, image) values ($1, $2, $3, $4, $5) returning id_member",
      [data.email, data.emailVerified, data.password ?? "", data.name, data.image]
    );
    return {
      error: null,
      data: res.rows[0] ?? null
    };
  } catch (error) {
    console.log(error);
    if (error.code == 23505) {
      return {
        error: "Email sudah terdaftar",
        data: null
      };
    }
    return {
      error: "Terjadi kesalahan",
      data: null
    };
  }
}
async function createSession(params) {
  try {
    const res = await db.query(
      "insert into sessions (user_id, expires, session_token, type, ip, device_info, host) values ($1, $2, $3, $4, $5, $6, $7)",
      [
        params.userId,
        params.expires,
        params.sessionToken,
        params.type,
        params.ip,
        params.deviceInfo,
        params.host
      ]
    );
    return {
      error: null,
      data: res.rows[0] ?? null
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Terjadi kesalahan",
      data: null
    };
  }
}
async function getAccountByProvider(providerAccountId, provider) {
  const res = await db.query(
    "select * from accounts a left join mt_member mm on mm.id_member = a.user_id where provider_account_id = $1 and provider = $2",
    [providerAccountId, provider]
  );
  return res.rows[0] ?? null;
}

export { createUser as a, getUserById as b, createSession as c, getAccountByProvider as d, getUserByEmail as g };
//# sourceMappingURL=user-BGUaQscX.js.map
