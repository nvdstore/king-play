import { formatISO } from 'date-fns';
import fs from 'fs';
import crypto__default from 'crypto';
import { customAlphabet } from 'nanoid';

const BASE_API_URL = "https://api.kingplay.id/";
async function request({
  endpoint,
  method = "GET",
  payload = {},
  uuid,
  params
}) {
  try {
    const timestamp = formatISO(/* @__PURE__ */ new Date(), { representation: "complete" });
    const hashedPayload = crypto__default.createHash("sha256").update(JSON.stringify(payload, null, 0)).digest("hex").toLowerCase();
    console.log("Signature Data", [method, endpoint, hashedPayload, timestamp].join(":"));
    const stringToSign = [method, endpoint, hashedPayload, timestamp].join(":");
    const privKey = fs.readFileSync("./private-key.pem");
    const sign = crypto__default.createSign("RSA-SHA256");
    sign.update(stringToSign);
    const signature = sign.sign(privKey, "base64");
    let finalUrl = new URL(endpoint, BASE_API_URL).href;
    if (params && Object.keys(params).length > 0) {
      const urlSearchParams = new URLSearchParams();
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          urlSearchParams.append(key, params[key]);
        }
      }
      finalUrl += `?${urlSearchParams.toString()}`;
    }
    const headers = new Headers();
    headers.append("X-TIMESTAMP", timestamp);
    headers.append("X-SIGNATURE", signature);
    headers.append("Authorization", `Bearer ${uuid}`);
    headers.append("Content-Type", "application/json");
    console.log("Request Method", method);
    console.log("Request URL", finalUrl);
    console.log("Request Headers", JSON.stringify(Object.fromEntries(headers)));
    console.log("Request Body", payload);
    const opts = { method, headers };
    if (method === "POST") {
      opts.body = JSON.stringify(payload);
    }
    const response = await fetch(finalUrl, opts);
    console.log("Response Status", response.status, response.statusText);
    const data = await response.json();
    console.log("Response Data", JSON.stringify(data));
    const {
      response_code: code,
      response_data: resData,
      response_message: message,
      ...additional
    } = data;
    return {
      ok: response.ok,
      code: code ?? "",
      data: resData,
      message: message ?? "",
      status: response.status,
      additional
    };
  } catch (error) {
    console.log(error);
    return {
      code: "XX",
      data: "",
      message: "",
      ok: false,
      status: 500
    };
  }
}
async function getClientIp() {
  const reqIp = await fetch("https://api.ipify.org/?format=json");
  const resIp = await reqIp.json();
  return resIp?.ip ?? "";
}
function generateMid(length) {
  const nanoid = customAlphabet("1234567890", 16);
  return nanoid();
}

export { BASE_API_URL as B, generateMid as a, getClientIp as g, request as r };
//# sourceMappingURL=request-NgL59NDw.js.map
