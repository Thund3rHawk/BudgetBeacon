import Pool from 'pg-pool'

export const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: 5432,
})

pool.connect()
    .then(client => {
        console.log('PostgreSQL connected successfully');
        client.release();
    })
    .catch(err => {
        console.error('PostgreSQL connection error:', err.stack);
    });
