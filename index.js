const express = require("express");
const app = express();

const port = process.env.port || 3000;

app.get('/api/branches/autocomplete', (req, res, next) => {
    res.send(req.query.x);
});

app.get('/api/branches', (req, res, next) => {
    res.send("hoho");
});

app.listen(port, () => {
    console.log(`server is listing on port http://localhost:${port}`);
});