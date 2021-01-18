const e = require("express");
const express = require("express");
const app = express();
const { Client } = require('pg');

const client = new Client({
    user: 'usyvzsz5ejbhsgsns0kq',
    host: 'bzvmwevcbktthyonxboy-postgresql.services.clever-cloud.com',
    database: 'bzvmwevcbktthyonxboy',
    password: 'U9y6dShovnBL8blvVzxp',
    port: 5432,
});

client.connect();


const port = process.env.PORT || 8080;

app.get('/api/branches/autocomplete', (req, res, next) => {
    const query = `
    select * from branches where branch ilike '${req.query.q}%' order by ifsc limit ${req.query.limit} offset ${req.query.offset};
    `;
    client.query(query, (err, val) => {
        if(err){
            console.error(err);
            return;
        }else{
            res.send(JSON.stringify(val.rows));
        }
    });
});


app.get('/api/branches', (req, res, next) => {
    const query = `
    select * from branches 
    where branch like '${req.query.q}%' or city ilike '${req.query.q}%' or address ilike '${req.query.q}%' or district ilike '${req.query.q}%' or 
    state ilike '${req.query.q}%' or ifsc ilike '${req.query.q}%'
    order by ifsc limit ${req.query.limit} offset ${req.query.offset};
    `;
    client.query(query, (err, val) => {
        if(err){
            console.error(err);
        }else{
            res.send(JSON.stringify(val.rows));
        }
    });
});



app.listen(port, () => {
    console.log(`server is listing on port http://localhost:${port}`);
});