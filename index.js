const express = require('express');
const cors = require('cors');
const path = require('path');

const { PORT } = require('./configuration/environment');
const { initializeDataBase } = require('./configuration/database');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

initializeDataBase()
    .then(() => {
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    })
    .catch(err => {
        console.log(`Something went wrong with DB: ${err}`);
    });