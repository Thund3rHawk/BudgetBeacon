import corn from 'node-cron'
import { pool } from '../db';

export function cronJob() {
    console.log('this is from cronjob');
    let expense = 10 * 3;
    corn.schedule('* * * * *', () => {
        expense += 10*2;
        const query = `INSERT INTO studentTable (name, month, year, expense) VALUES ( $1, $2, $3, $4 )`;
        pool.query(query, ['abcd', 'jan', '2025', expense], (error, result) => {
            if (error) {
                throw error
            }
            console.log('data added successfully', result.command);
        })
    })
}