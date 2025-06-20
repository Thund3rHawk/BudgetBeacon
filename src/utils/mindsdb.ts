import MindsDB from 'mindsdb-js-sdk';

export async function connectMindsDB() {
    try {
        // this will connect without authentication
        await MindsDB.connect({
            host: 'http://127.0.0.1:47334'
        });
        console.log('connected');

    } catch (error) {
        console.log(error);
    }
}

// Testing Command
// export async function runQuery() {
//     try {
//         const query = `SELECT * FROM postgresql_conn.studentTable`;
//         let result = await MindsDB.SQL.runQuery(query);
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//     }
// }
