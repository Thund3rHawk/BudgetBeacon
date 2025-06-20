import express from 'express'
import { connectMindsDB} from './src/utils/mindsdb';
// import { cronJob } from './src/utils/cronJob';
import { router } from './src/routes';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))


// cronJob();
connectMindsDB();

app.use('/api/v1/', router);

app.listen (port, ()=>{
    console.log(`Server is running on port: ${port}`);    
})

