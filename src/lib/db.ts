import { createClient } from '@libsql/client';


const url = process.env.TURSO_DB_URL;
const authToken = process.env.TURSO_DB_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error(
    'Turso DB credentials missing. Check your .env file and ensure TURSO_DB_URL and TURSO_DB_AUTH_TOKEN are set.'
  );
}


const turso = createClient({
    url,
    authToken,
  });
  
  export default turso;