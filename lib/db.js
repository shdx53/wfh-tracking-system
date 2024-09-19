import mysql from "mysql2/promise";

const connection = async () => {
  const pool = mysql.createPool({
    host: process.env.DB_IP,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  return pool;
};

export default connection;
