import type { Request, Response } from "express"
import { pool } from "../db"
// import { runQuery } from "../utils/mindsdb"
import { asyncHandler } from "../utils/asyncHandler";
import MindsDB from 'mindsdb-js-sdk';

export const createDb = asyncHandler((req: Request, res: Response) => {
    pool.query('CREATE TABLE IF NOT EXISTS studentTable (id SERIAL PRIMARY KEY, name VARCHAR(100), month VARCHAR(12), year INTEGER, expense INTEGER)', (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})

export const enterDataToDB = asyncHandler((req, res) => {
    const { name, month, year, expense } = req.body;
    const query = `INSERT INTO studentTable (name, month, year, expense) VALUES ( $1, $2, $3, $4 )`;
    pool.query(query, [name, month, year, expense], (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})

export const seeAllData = asyncHandler((req, res) => {
    pool.query('SELECT * FROM studentTable', (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})

export const deleteTable = asyncHandler((req, res) => {
    pool.query('DROP table studentTable', (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rowCount)
    })
})

// export const checkQuery = async (req: Request, res: Response) => {
//     try {
//         await runQuery();
//     } catch (error) {
//         console.log(error);

//     }
// }

// Creating Knowledge Base
export const createKnowledgeBase = asyncHandler(async (req, res) => {
    try {
        const query = `CREATE KNOWLEDGE_BASE student_kb
                            USING
                                embedding_model = {
                                    "provider": "ollama",
                                    "model_name": "nomic-embed-text",
                                    "base_url": "http://host.docker.internal:11434"
                                },
                                reranking_model = {
                                    "provider": "ollama",
                                    "model_name": "gemma",
                                    "base_url": "http://host.docker.internal:11434"
                                },
                                metadata_columns = ['name', 'month', 'year'],
                                content_columns = ['expense'],
                                id_column = 'id';`
        let result = await MindsDB.SQL.runQuery(query);
        console.log(result);
        res.send(result)
    } catch (error) {
        console.log(error);
    }
})

// Load My PostgreSQL data into KB
export const copyDatatoKB = asyncHandler(async(req, res)=>{
    try {
        const query = `INSERT INTO student_kb
                            SELECT * FROM postgresql_conn.studentTable`;
        let result = await MindsDB.SQL.runQuery(query)
        console.log(result);
        res.send(result);
    } catch (error) {
        throw error;
    }
})

// Insert data into KB 
export const enterDataToKB = asyncHandler(async (req, res) => {
    try {
        const { name, month, year, expense } = req.body;
        const query = `INSERT INTO studentTable (name, month, year, expense) VALUES ( ${name}, ${month}, ${year}, ${expense} )`;
        let result = await MindsDB.SQL.runQuery(query)
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

// Get all data from KB
export const getALlDataFromKB = asyncHandler(async (req, res)=>{
    try {
        const query = `SELECT * FROM student_kb`;
        let result = await MindsDB.SQL.runQuery(query)
        console.log(result);
        res.send(result);
    } catch (error) {
        throw error;
    }    
})