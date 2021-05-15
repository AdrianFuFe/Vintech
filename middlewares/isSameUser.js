const {getConnection} = require("../db");

async function isSameUser (req,res,next){
    let connection;

    try{
        connection = await getConnection();

        const authorization = req.headers
        next();
    }catch(error){
        next(error)
    }
}