const {getConnection} = require("../../db");
const { uploadImage } = require("../../helpers"); 


async function editUser(req,res,next){
    let connection;
    try{
        connection = await getConnection();

        const {username, fname, lname, email, bio, last_ubication} = req.body;
        
        //comprobamos que siempre exista email y username
        if(!username || !email) throw new Error ("El nombre de usuario y el email son obligatorios");

        //comprobamos que no exista un usuario con el mismo email
        let existingUser
        try{
            [existingUser ]= await connection.query(`
            SELECT *
            FROM users
            WHERE email=? AND NOT id=?
            `,[email, req.auth.id]);
        }catch(error){
            throw new Error ("No se ha podido buscar el usuario")
        }
        //comprobamos que el nuevo email no coincida con uno ya existente
        if(existingUser.length > 0) throw new Error ("Ya existe un usuario con este email")


    //CAMBIO DE IMAGEN PERFIL
    //actualiza el perfil si incluye la img
    if(req.files){
        let nameFile;
        try {
            nameFile = await uploadImage({
                file: req.files.picture,
                directory: "avatares"
            });
        }catch(error){
            throw new Error ("No se ha podido subir la imagen");
        }

        //actualiza los datos de usuario incluyendo la img
        try{
            await connection.query(`
            UPDATE users
            SET img=?,
                username=?,
                fname=?,
                lname=?,
                email=?,
                bio=?,
                last_ubication=?
            WHERE id=?
            `,[nameFile, username, fname, lname, email, bio, last_ubication,req.auth.id])
        }catch(error){
            throw new Error("Se ha producido un error al actualizar los datos de usuario")
        }
    //actualizar usuario si no cambia la img
    }else{
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
    }

        res.send("Usuario actualizado correctamente");

    }catch(error){
        next(error)
    }finally{
        if (connection) connection.release()
    }
}

module.exports = {editUser};