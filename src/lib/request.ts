import { formatISO } from 'date-fns';
import fs from 'fs';
import crypto from 'crypto';
import { BASE_API_URL } from '$env/static/private';

export type RequestType = {
	endpoint: string;
	method?: 'POST' | 'GET';
	payload?: Record<string, any> | null;
	params: Record<string, string>;
	uuid: string;
};

export async function request({
	endpoint,
	method = 'GET',
	payload = null,
	uuid,
	params
}: RequestType) {
	const timestamp = formatISO(new Date(), { representation: 'complete' });

	const hashedPayload = crypto
		.createHash('sha256')
		.update(JSON.stringify(payload ?? '', null, 0))
		.digest('hex')
		.toLowerCase();

	console.log('Signature Data', JSON.stringify([method, endpoint, hashedPayload, timestamp]));
	const stringToSign = [method, endpoint, hashedPayload, timestamp].join(':');
	const privKey = fs.readFileSync('./private-key.pem');
	const sign = crypto.createSign('RSA-SHA256');
	sign.update(stringToSign);
	const signature = sign.sign(privKey, 'base64');

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
	headers.append('X-TIMESTAMP', timestamp);
	headers.append('X-SIGNATURE', signature);
	headers.append('Authorization', `Bearer ${uuid}`);

	console.log('Request Method', method);
	console.log('Request URL', finalUrl);
	console.log('Request Headers', JSON.stringify(Object.fromEntries(headers)));
	console.log('Request Body', payload);

	const response = await fetch(finalUrl, { headers });
	console.log('Response Status', response.status, response.statusText);
	const data = await response.json();
	console.log('Response Data', JSON.stringify(data));

	return {
		ok: response.ok,
		code: data.response_code ?? '',
		data: data.response_data,
		message: data.response_message ?? '',
		status: response.status
	};
}

export async function getClientIp() {
	const getIp = await fetch('https://api.ipify.org/?format=json');
	const ipData = await getIp.json();

	return ipData?.ip ?? '';
}
