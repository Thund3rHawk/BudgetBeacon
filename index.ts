import express from 'express'
import { checkQuery, createDb } from './src/controllers/index.controller';
import { connectMindsDB, runQuery } from './src/utils/mindsdb';

const app = express();
const port = process.env.PORT || 4000;

connectMindsDB();

app.post ('/', createDb);
app.get ('/run-query', checkQuery);


app.listen (port, ()=>{
    console.log(`Server is running on port: ${port}`);    
})
