const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use('/static' ,express.static(path.join(__dirname + 'public')));

app.listen(PORT, () => {
    console.log("Listening at port:" + PORT);
});