const express = require('express');
const bodyParser = require('body-parser');
const prospectRoutes = require('./routes/prospectRoutes');
const clientRoutes = require('./routes/clientRoutes');

const app = express();
const port = 3003;

app.use(bodyParser.json());
app.use('/prospects', prospectRoutes);
app.use('/clients', clientRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
