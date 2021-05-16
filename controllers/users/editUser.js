require("dotenv").config();
const {getConnection} = require("../../db");
const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");

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
            WHERE email=? AND NOT id=?
            `,[email, req.auth.id]);

        }catch(error){
            throw new Error ("No se ha podido buscar el usuario")
        }

        //comprobamos que el nuevo email no coincida con uno ya existente
        if(existingUser.length > 0) throw new Error ("Ya existe un usuario con este email")


    //CAMBIO DE IMAGEN PERFIL
    //actualiza el perfil si incluye la img
    if(req.files.img){
        let nameFile;
        try {
            //crear ruta de carpeta contenedora
            const imageFolder = path.join(__dirname, process.env.UPLOADS_DIR);
            //crear la carpeta contenedora
            await fs.mkdir(imageFolder, {recursive:true});
            //aplicamos sharp a la img
            const imgSharped = sharp(req.files.img.data);
            const infoImg = await imgSharped.metadata();

            //filtro de redimension de img
            if(infoImg.width > 1000) imgSharped.resize(1000);

            //modificacion de nombre de img
            nameFile = `${uuid.v4()}.jpg`;
            //guardamos la img en la carpeta
            await imgSharped.toFile(path.join(imageFolder, nameFile));

        }catch(error){
            throw new Error ("No se ha podido subir la imagen");
        }


        //ACTUALIZAR DATOS DE USUARIO
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