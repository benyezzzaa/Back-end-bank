const Transaction = require('../models/transaction');

exports.getAllTransactions = (req, res) => {
    Transaction.getAll((err, results) => {
        if (err) {
            console.error('Error retrieving transactions:', err);
            return res.status(500).send('Server error');
        }
        res.json(results);
    });
};

exports.approveTransaction = (req, res) => {
    const { transactionId } = req.params;
    Transaction.approve(transactionId, (err, results) => {
        if (err) {
            console.error('Error approving transaction:', err);
            return res.status(500).send('Server error');
        }
        res.send('Transaction approved successfully');
    });
};

exports.rejectTransaction = (req, res) => {
    const { transactionId } = req.params;
    Transaction.reject(transactionId, (err, results) => {
        if (err) {
            console.error('Error rejecting transaction:', err);
            return res.status(500).send('Server error');
        }
        res.send('Transaction rejected successfully');
    });
};
