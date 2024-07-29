const express = require('express');
const bodyParser = require('body-parser');
const prospectRoutes = require('./routes/prospectRoutes');
const clientRoutes = require('./routes/clientRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Adjust the path as necessary
const db = require('./db');

const app = express();
const port = 3003;


app.use(bodyParser.json());
app.use('/prospects', prospectRoutes);
app.use('/clients', clientRoutes);
app.use('/transactions', transactionRoutes); // Ajouter les routes des transactions
app.use('/admin', adminRoutes);

app.listen(3003, () => {
    console.log(`Server is running on port ${port}`);
});
