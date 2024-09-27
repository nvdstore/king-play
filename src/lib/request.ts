import { formatISO } from 'date-fns';
import fs from 'fs';
import crypto from 'crypto';
import { customAlphabet } from 'nanoid';
import { BASE_API_URL } from '$env/static/private';

export type RequestType = {
	endpoint: string;
	method?: 'POST' | 'GET';
	payload?: Record<string, any> | null;
	params?: Record<string, string>;
	uuid: string;
};

export type ResponseType = {
	ok: boolean;
	code: string;
	data: any;
	message: string;
	status: number;
	additional?: any;
};

export async function request({
	endpoint,
	method = 'GET',
	payload = {},
	uuid,
	params
}: RequestType): Promise<ResponseType> {
	try {
		const timestamp = formatISO(new Date(), { representation: 'complete' });

		const hashedPayload = crypto
			.createHash('sha256')
			.update(JSON.stringify(payload, null, 0))
			.digest('hex')
			.toLowerCase();

		console.log('Signature Data', [method, endpoint, hashedPayload, timestamp].join(':'));
		const stringToSign = [method, endpoint, hashedPayload, timestamp].join(':');
		const privKey = fs.readFileSync('./private-key.pem');
		const sign = crypto.createSign('RSA-SHA256');
		sign.update(stringToSign);
		const signature = sign.sign(privKey, 'base64');

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
		headers.append('X-TIMESTAMP', timestamp);
		headers.append('X-SIGNATURE', signature);
		headers.append('Authorization', `Bearer ${uuid}`);
		headers.append('Content-Type', 'application/json');

		console.log('Request Method', method);
		console.log('Request URL', finalUrl);
		console.log('Request Headers', JSON.stringify(Object.fromEntries(headers)));
		console.log('Request Body', payload);

		const opts: RequestInit = { method, headers };
		if (method === 'POST') {
			opts.body = JSON.stringify(payload);
		}
		const response = await fetch(finalUrl, opts);
		console.log('Response Status', response.status, response.statusText);
		const data = await response.json();
		console.log('Response Data', JSON.stringify(data));

		const {
			response_code: code,
			response_data: resData,
			response_message: message,
			...additional
		} = data;

		return {
			ok: response.ok,
			code: code ?? '',
			data: resData,
			message: message ?? '',
			status: response.status,
			additional: additional
		};
	} catch (error) {
		console.log(error);
		return {
			code: 'XX',
			data: '',
			message: '',
			ok: false,
			status: 500
		};
	}
}

export async function getClientIp() {
	const reqIp = await fetch('https://api.ipify.org/?format=json');
	const resIp = await reqIp.json();

	return resIp?.ip ?? '';
}

export function generateMid(length?: number) {
	const nanoid = customAlphabet('1234567890', length ?? 16);
	return nanoid();
}
