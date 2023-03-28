//BOILERPLATE
const pg = require('pg');
let pool;

// Since we're running this app on our own computer
// we'll connect to the postgres database that is 
// also running on our computer (localhost)
pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'awsV3Test',   // 	💥 Change this to the name of your database!
});


module.exports = pool;