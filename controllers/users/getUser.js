const {getConnection} = require("../../db");

async function getUser (req,res,next){
    let connection
    try{
        connection = await getConnection();
        
        const {id} = req.params;

        let user;
        //obtenemos datos de user
        try{
            [user] = await connection.query(`
                SELECT *
                FROM users
                WHERE id=?
            `,[id])

        }catch(error){
            throw new Error ("no se ha podido obtener usuario")
        }
        if(user.length<1){
            throw new Error ("El usuario no existe")
        }

        res.send(user)
    }catch(error){
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = {getUser};