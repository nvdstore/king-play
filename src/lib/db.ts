import { env } from '$env/dynamic/private';
import pg, { type QueryConfig, type QueryResult } from 'pg';

export const pool = new pg.Pool({
	host: env.DATABASE_HOST,
	user: env.DATABASE_USER,
	password: env.DATABASE_PASSWORD,
	database: env.DATABASE_NAME,
	port: Number(env.DATABASE_PORT),
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000
});

export const db = {
	async query(query: string | QueryConfig, values: any[]): Promise<QueryResult<any> | null> {
		try {
			return pool.query(query, values);
		} catch (error) {
			console.log(error);
			return null;
		}
	}
};
