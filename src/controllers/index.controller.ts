import type { Request, Response } from "express"
import { pool } from "../db"
// import { runQuery } from "../utils/mindsdb"
import { asyncHandler } from "../utils/asyncHandler";
import MindsDB from 'mindsdb-js-sdk';

export const createDb = asyncHandler((req: Request, res: Response) => {
    pool.query('CREATE TABLE IF NOT EXISTS studentTable (id SERIAL PRIMARY KEY,  month VARCHAR(12), name VARCHAR(100), year VARCHAR(12), expense VARCHAR(100))', (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})

export const enterDataToDB = asyncHandler((req, res) => {
    const { name, month, year, expense } = req.body;
    const query = `INSERT INTO studentTable (month, name, year, expense) VALUES ( $1, $2, $3, $4 )`;
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
    pool.query('DROP TABLE studentTable', (error, result) => {
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

// Connection postgresql to mindsDB
export const connectionPostgres = asyncHandler(async (req, res) => {
    try {
        const query = `CREATE DATABASE postgresql_conn 
                        WITH ENGINE = 'pgvector', 
                        PARAMETERS = {
                            "host": "host.docker.internal",
                            "port": 5432,
                            "database": "mindsdb",
                            "user": "postgres",
                            "password": "8967326124",
                            "distance": "cosine"
                        };`
        let result = await MindsDB.SQL.runQuery(query);
        console.log(result);
        res.send(result)
    } catch (error) {
        console.log(error);
    }
})


// Creating Knowledge Base and defined the metadata columns
export const createKnowledgeBase = asyncHandler(async (req, res) => {
    try {
        const query = `CREATE KNOWLEDGE_BASE IF NOT EXISTS student_kb
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
                            storage = postgresql_conn.student_kb_table,
                            metadata_columns = ['name','year'],
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
export const copyDatatoKB = asyncHandler(async (req, res) => {
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
        const query = `INSERT INTO studentTable (name, month, year, expense) VALUES ( ${month}, ${name}, ${year}, ${expense} )`;
        let result = await MindsDB.SQL.runQuery(query)
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

// Get all data from KB
export const getALlDataFromKB = asyncHandler(async (req, res) => {
    try {
        const query = `SELECT * FROM student_kb`;
        let result = await MindsDB.SQL.runQuery(query)
        console.log(result);
        res.send(result);
    } catch (error) {
        throw error;
    }
})

// Delete Knowledge Base
export const deleteKB = asyncHandler(async (req, res) => {
    try {
        const query = `DROP KNOWLEDGE_BASE student_kb;`;
        let result = await MindsDB.SQL.runQuery(query)
        console.log(result);
        res.send(result);
    } catch (error) {
        throw error;
    }
})

// KB Sementic Queries
export const customQuery = asyncHandler(async (req, res) => {
    try {
        const { prompt } = req.body;
        const query = `SELECT * FROM student_kb WHERE text_search('${prompt}');`;
        let result = await MindsDB.SQL.runQuery(query)
        console.log(result);
        res.send(result);
    } catch (error) {
        throw error;
    }
})

// Creating Index on KB 
export const createIndexToKB = asyncHandler(async (req, res) => {
    try {
        const query = `CREATE INDEX ON KNOWLEDGE_BASE student_kb;`;
        let result = await MindsDB.SQL.runQuery(query)
        console.log(result);
        res.send(result);
    } catch (error) {
        throw error;
    }
})

// Creating JOBS
export const creatingJobs = asyncHandler(async (req, res) => {
    try {
        const query = `CREATE JOB refresh_student_kb (SELECT * FROM postgresql_conn.studentTable)
                        START NOW
                        EVERY 6 hours;`;
        let result = await MindsDB.SQL.runQuery(query)
        console.log(result);
        res.send(result);
    } catch (error) {
        throw error;
    }
})

// Delete Jobs
export const deleteJobs = asyncHandler(async (req, res) => {
    try {
        const query = `DROP JOB refresh_student_kb`;
        let result = await MindsDB.SQL.runQuery(query)
        console.log(result);
        res.send(result);
    } catch (error) {
        throw error;
    }
})

// Integrating the AI Tables 
export const createAITables = asyncHandler(async (req, res) => {
    try {
        const query = `CREATE MODEL sentiment_classifier_model
                        PREDICT student_kb
                        USING
                            engine = 'ollama',
                            model_name = 'gemma',
                            prompt_template = 'describe the sentiment of the reviews
                                                strictly as "positive", "neutral", or "negative".
                                                "I love the product":positive
                                                "It is a scam":negative
                                                "{{review}}.":';`;
        let result = await MindsDB.SQL.runQuery(query)
        console.log(result);
        res.send(result);
    } catch (error) {
        throw error;
    }
})
