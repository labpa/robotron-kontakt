// importing required modules
const { execute } = require('@getvim/execute');
const dotenv = require('dotenv').config();

// getting db connection parameters from environment file
const username = process.env.DB_USER;
const database = process.env.DATABASE;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

// defining backup file name
const date = new Date();
const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
const backupFile= `pg-backup-${today}.tar`;

// writing postgresql backup function
const takePGBackup = () => {
    execute(`pg_dump -U ${username} -h ${dbHost} -p ${dbPort} -f ${backupFile} -F t -d ${database}`)
    .then( async () => {
    	console.log(`Backup created successfully`);
    })
    .catch( (err) => {
    	console.log(err);
    });
}

// calling postgresql backup function
takePGBackup();