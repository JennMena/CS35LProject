const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./api/routes/userRoutes');

const app = express();
const port = process.env.port || 3001;

app.use(bodyParser.json());
app.use(cors());

//Basic Route
app.get('/', (req, res) => {
    res.send('API its run');
});

//Routes
app.use('/', userRoutes);

app.listen(port, () => {
    console.log(`Server runs at http://localhost:${port}`);
});