const mongoose = require('mongoose')

const connectToDB = async () => {

    const db_url = process.env.DB_CONNECT
    try {
      await mongoose.connect( db_url);
        console.log("database connected at url " + db_url);
    } 
    catch (error) {
        console.log('error occured while connecting to the database ', error);
        process.exit(1);
    }
}

module.exports = {
    connectToDB,
}