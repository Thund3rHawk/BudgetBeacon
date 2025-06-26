import corn from 'node-cron'
import { pool } from '../db';

const names = ['John', 'Dummy', 'Henry', 'Harry', 'Bob', 'Joseph'];
const years = ['2010', '2011', '2012','2013', '2014', '2022', '2025','2024'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function cronJob() {
    console.log('this is from cronjob');
    let expenseMoney = 10 * 3;
    corn.schedule('* * * * *', () => {
        expenseMoney += 10*2;
        const query = `INSERT INTO studentTable (name, month, year, expense) VALUES ( $1, $2, $3, $4 )`;
        const name = names[Math.floor(Math.random() * names.length)];
        const year = years[Math.floor(Math.random() * names.length)];
        const month = months[Math.floor(Math.random() * names.length)];
        const expense = `He spends Rs. ${expenseMoney} on the month ${month} year ${year}`;
        pool.query(query, [month, name , year, expense], (error, result) => {
            if (error) {
                throw error
            }
            console.log('data added successfully', result.command);
        })
    })
}