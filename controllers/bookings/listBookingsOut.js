const { getConnection } = require("../../db");

async function (req,res,next){
    let connection;
    try {
        connection = await getConnection();
    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = {  };