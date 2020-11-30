const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('/dist/prueba'));
/*
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/prueba/index.html'));
});
*/
app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/prueba/' }
    );
});

app.listen(process.env.PORT || 8080);