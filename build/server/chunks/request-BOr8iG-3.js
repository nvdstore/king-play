import { formatISO } from 'date-fns';
import fs from 'fs';
import crypto__default from 'crypto';

const BASE_API_URL = "https://api.kingplay.id/";
async function request({
  endpoint,
  method = "GET",
  payload = null,
  uuid,
  params
}) {
  const timestamp = formatISO(/* @__PURE__ */ new Date(), { representation: "complete" });
  const hashedPayload = crypto__default.createHash("sha256").update(JSON.stringify(payload ?? {}, null, 0)).digest("hex").toLowerCase();
  console.log("Signature Data", JSON.stringify([method, endpoint, hashedPayload, timestamp]));
  const stringToSign = [method, endpoint, hashedPayload, timestamp].join(":");
  const privKey = fs.readFileSync("./private-key.pem");
  const sign = crypto__default.createSign("RSA-SHA256");
  sign.update(stringToSign);
  const signature = sign.sign(privKey, "base64");
  let finalUrl = new URL(endpoint, BASE_API_URL).href;
  if (Object.keys(params).length > 0) {
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
  console.log("Request Method", method);
  console.log("Request URL", finalUrl);
  console.log("Request Headers", JSON.stringify(Object.fromEntries(headers)));
  console.log("Request Body", payload);
  const response = await fetch(finalUrl, { headers });
  console.log("Response Status", response.status, response.statusText);
  const data = await response.json();
  console.log("Response Data", JSON.stringify(data));
  return {
    ok: response.ok,
    data,
    status: response.status
  };
}
async function getClientIp() {
  const getIp = await fetch("https://api.ipify.org/?format=json");
  const ipData = await getIp.json();
  return ipData?.ip ?? "";
}

export { BASE_API_URL as B, getClientIp as g, request as r };
//# sourceMappingURL=request-BOr8iG-3.js.map
