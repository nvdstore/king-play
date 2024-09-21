import { formatISO } from 'date-fns';
import fs from 'fs';
import crypto from 'crypto';
import { BASE_API_URL } from '$env/static/private';

export type RequestType = {
	endpoint: string;
	method?: 'POST' | 'GET';
	payload?: Record<string, any> | null;
	params: Record<string, string>;
};

export async function request({ endpoint, method = 'GET', payload = null, params }: RequestType) {
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

	const myHeaders = new Headers();
	myHeaders.append('timestamp', timestamp);
	myHeaders.append('signature', signature);

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
	console.log('Request Method', method);
	console.log('Request URL', finalUrl);
	console.log('Request Headers', JSON.stringify(Object.fromEntries(myHeaders)));
	console.log('Request Body', payload);

	const response = await fetch(finalUrl, {
		headers: myHeaders
	});
	console.log('Response Status', response.status, response.statusText);
	const data = await response.json();
	console.log('Response Data', JSON.stringify(data));

	return {
		data,
		status: response.status
	};
}
