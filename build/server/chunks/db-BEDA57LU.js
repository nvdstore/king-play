import { p as private_env } from './shared-server-DWgAsK3Q.js';
import pg from 'pg';

const db = new pg.Pool({
  host: private_env.DATABASE_HOST,
  user: private_env.DATABASE_USER,
  password: private_env.DATABASE_PASSWORD,
  database: private_env.DATABASE_NAME,
  max: 20,
  idleTimeoutMillis: 3e4,
  connectionTimeoutMillis: 2e3
});

export { db as d };
//# sourceMappingURL=db-BEDA57LU.js.map
