const {getConnection} = require("../../db");

async function editUser(req,res,next){
    let connection;
    try{
        connection = await getConnection();

        const {username, fname, lname, email, bio, last_ubication} = req.body;

        //comprobamos que no exista un usuario con el mismo email
        let existingUser
        try{
            [existingUser ]= await connection.query(`
            SELECT *
            FROM users
            WHERE email=?
            `,[email]);

        }catch(error){
            throw new Error ("No se ha podido buscar el usuario")
        }

        //comprobamos que el nuevo email no coincida con uno ya existente
        if(existingUser.length > 0) throw new Error ("Ya existe un usuario con este email")
        
        //actualizo datos de user
        try{
            await connection.query(`
            UPDATE users
            SET username=?,
                fname=?,
                lname=?,
                email=?,
                bio=?,
                last_ubication=?
            WHERE id=?
            `,[username, fname, lname, email, bio, last_ubication,req.auth.id])
        }catch(error){
            throw new Error("Se ha producido un error al actualizar los datos de usuario")
        }

        res.send({username, fname, lname, email, bio, last_ubication});

    }catch(error){
        next(error)
    }finally{
        if (connection) connection.release()
    }
}

module.exports = {editUser};