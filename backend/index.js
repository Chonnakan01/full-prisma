const mysql = require('mysql2');

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "b6521601989",
    database: "ministore",
    port: 3307
};

const pool = mysql.createPool(dbConfig);

function handleDisconnect() {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("❌ MySQL Connection Failed:", err);
            setTimeout(handleDisconnect, 2000); // ลองเชื่อมใหม่หลัง 2 วิ
        } else {
            console.log("✅ Connected to MySQL Database");
            // หลังจากเชื่อมต่อสำเร็จ, ต้องปล่อย connection กลับ pool
            connection.release();
        }
    });
}

handleDisconnect();

module.exports = pool;
