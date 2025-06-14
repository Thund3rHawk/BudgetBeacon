import type { Request, Response } from "express"
import { pool } from "../db"
import { runQuery } from "../utils/mindsdb"

export const createDb = (req: Request, res: Response) => {
    pool.query('CREATE TABLE IF NOT EXISTS studentTable (id SERIAL PRIMARY KEY, name VARCHAR(100), age INT)', (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
}

export const checkQuery = async (req:Request,res:Response) =>{
    try {
        await runQuery();
    } catch (error) {
        console.log(error);
        
    }
}