import express from 'express'
import {connectionPostgres, copyDatatoKB,
        createAITables,
        createDb,
        createIndexToKB,
        createKnowledgeBase,
        creatingJobs,
        customQuery,
        deleteJobs,
        deleteKB,
        deleteTable,
        enterDataToDB,
        enterDataToKB,
        getALlDataFromKB,
        seeAllData} from '../controllers/index.controller';
        
export const router = express.Router();


router.route('/').get((req,res)=>{
    res.send('Hello this is from Budget Beacon')
});

router.route('/createDB').get(createDb);
router.route('/enterdata').post(enterDataToDB);
router.route('/checkData').get(seeAllData);
router.route('/deleteTable').get(deleteTable);

// Minds routes
router.route('/minds/connectToPstgres').get(connectionPostgres);
router.route('/minds/createAITables').get(createAITables);
router.route('/minds/createJob').get(creatingJobs);
router.route('/minds/deleteJob').get(deleteJobs);

// Knowledge Base Routes
router.route('/kb/create').get(createKnowledgeBase);
router.route('/kb/enterdata').post(enterDataToKB);
router.route('/kb/copyDataFromDB').get(copyDatatoKB);
router.route('/kb/getAllData').get(getALlDataFromKB);
router.route('/kb/getFromPrompt').post(customQuery);
router.route('/kb/createIndex').get(createIndexToKB);
router.route('/kb/delete').get(deleteKB);
