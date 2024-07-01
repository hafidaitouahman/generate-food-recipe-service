//import mysql from 'mysql';
var mysql = require('mysql'); 
import config from "../config/config";

export const connectMysqlDB = async () => {
    try {
        console.info("Connecting to database..." + config.MYSQL_URI);
		var con = mysql.createConnection({
								  host: "localhost",
								  user: "root",
								  password: "root2023"
								})
        await con.connect();
        console.info("Database connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

