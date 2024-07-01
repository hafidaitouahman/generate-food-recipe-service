import User, { IUser } from "./models/UserModel";
import { connectMongoDB } from "./mongodb_connection";
import { connectMysqlDB } from "./mysql_connection";
 
export { User, IUser, connectMysqlDB };