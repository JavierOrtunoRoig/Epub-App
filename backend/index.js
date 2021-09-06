const express = require('express');
const cors = require('cors')

const app = express();
const port = 4000;

app.use(express.static('public'))

app.use(cors());

//app.use('/api', require('../routes/api'));
app.use('/', require('./routes/index'));

app.listen(port, () => {
    console.log('Server corriendo en puerto:', port);
});