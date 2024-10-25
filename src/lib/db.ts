import { env } from '$env/dynamic/private';
import pg, { type QueryConfig, type QueryResult } from 'pg';

pg.types.setTypeParser(1114, function (stringValue) {
	return new Date(stringValue + 'Z');
});

export const db = new pg.Pool({
	host: env.DATABASE_HOST,
	user: env.DATABASE_USER,
	password: env.DATABASE_PASSWORD,
	database: env.DATABASE_NAME,
	port: Number(env.DATABASE_PORT),
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000
});
