import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import pg from 'pg';

export const db = new pg.Pool({
	host: building ? '' : env.DATABASE_HOST,
	user: building ? '' : env.DATABASE_USER,
	password: building ? '' : env.DATABASE_PASSWORD,
	database: building ? '' : env.DATABASE_NAME,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000
});
