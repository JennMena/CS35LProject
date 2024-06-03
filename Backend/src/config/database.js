const sql = require('mssql');

const config = {

    user: 'sa',
    password: 'Shivani@mn123',
    server: 'localhost',
    database: 'BUDGET',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

async function getConnection() {
    try {
        const pool = await sql.connect(config);
        return pool;
    } catch (error) {
        console.log('Connection error:', error);
        throw error;
    }
}

module.exports = {
    getConnection,
    sql
}