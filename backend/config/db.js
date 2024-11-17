import mongoose from "mongoose";
import { dburl } from "./config.js";
import chalk from "chalk";
const connectDB = async () =>{
    try {
        await mongoose.connect(dburl)
        console.log(`${chalk.gray.bold(`connected to the Database: ${chalk.green.bold(dburl)}`   ) }`)
    } catch (error) {
        console.log(`${chalk.red.bold(`error connected to the database ${error} `)}`)
        process.exit(1);
        
    }

    
};
export default connectDB




