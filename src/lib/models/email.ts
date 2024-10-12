import crypto from 'crypto';
import { db } from '../db';

export type SendEmailParams = {
	name: string;
	from: string;
	to: string;
	subject: string;
	body: string;
};

export async function sendEmail(params: SendEmailParams) {
	const res = await db.query(
		'insert into email_notify (name, email, recipient_email, subject, body) values ($1, $2, $3, $4, $5) returning sender_id',
		[params.name, params.from, params.to, params.subject, params.body]
	);
	return res?.rows[0] ?? null;
}

export async function createEmailToken(idMember: string) {
	const token = crypto.randomUUID();

	const res = await db.query(
		"insert into email_token (user_id, token, created_at) values ($1, $2, 'now()') returning id",
		[idMember, token]
	);
	if (res && res?.rowCount! > 0) {
		return token;
	}

	return null;
}

export async function getCurrentToken(idMember: string) {
	const res = await db.query(
		'select token, created_at from email_token where user_id = $1 order by 1 desc limit 1',
		[idMember]
	);
	return res?.rows[0] ?? null;
}

export async function getEmailToken(token: string) {
	const res = await db.query(
		'select user_id, token, created_at from email_token where token = $1 and used_at is null order by 1 desc limit 1',
		[token]
	);
	return res?.rows[0] ?? null;
}

export async function updateEmailToken(idMember: string, token: string) {
	try {
		const res = await db.query(
			`update email_token set used_at = 'now()' where user_id = $1 and token = $2 returning id`,
			[idMember, token]
		);

		return {
			error: null,
			data: res?.rows[0] ?? null
		};
	} catch (error: any) {
		console.log(error);

		return {
			error: error?.message,
			data: null
		};
	}
}
