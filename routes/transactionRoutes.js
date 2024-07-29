const express = require('express');
const router = express.Router();
const { getAllTransactions, approveTransaction, rejectTransaction } = require('../controllers/transactionController');

router.get('/', getAllTransactions);
router.post('/approve/:transactionId', approveTransaction);
router.post('/reject/:transactionId', rejectTransaction);

module.exports = router;
