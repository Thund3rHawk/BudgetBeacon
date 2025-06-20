import express from 'express'
import { copyDatatoKB, createDb, createKnowledgeBase, deleteTable, enterDataToDB, enterDataToKB, getALlDataFromKB, seeAllData } from '../controllers/index.controller';

export const router = express.Router();

router.route('/').get(createDb);
// router.route('/run-query').get(checkQuery);
router.route('/enterdata').post(enterDataToDB);
router.route('/enterdata-to-KB').post(enterDataToKB);
router.route('/checkData').get(seeAllData);
router.route('/deleteTable').get(deleteTable);
router.route('/create-KB').get(createKnowledgeBase);
router.route('/copy_data_to_KB').get(copyDatatoKB);
router.route('/get_data_from_KB').get(getALlDataFromKB);
