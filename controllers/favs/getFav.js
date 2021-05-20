const { getConnection } = require("../../db");

async function getFav (req,res,next){
    let connection;
    try {
        connection = await getConnection();



        res.send({
            status: "OK",
            message:"",
        });
    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = { getFav };