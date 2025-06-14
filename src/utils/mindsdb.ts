import MindsDB from 'mindsdb-js-sdk';
// const MindsDB = require("mindsdb-js-sdk").default; // alternative for CommonJS syntax


export async function connectMindsDB() {
    try {

        // No authentication needed for self-hosting
        await MindsDB.connect({
            host: "http://127.0.0.1:47334",
            user: process.env.PG_USER as string,
            password: process.env.PG_PASSWORD as string
        });
        console.log('connected');

    } catch (error) {
        // Failed to connect to local instance
        console.log(error);
    }
}

export async function runQuery() {
    try {
        const tableName = 'studentTable'; // replace with your table name
        const query = `SHOW TABLES LIKE '${tableName}'`;
        let result = await MindsDB.SQL.runQuery(query);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}