require("dotenv").config();
const {getConnection} = require ("../../db");
const crypto = require("crypto");
const {sendMail}= require("../../helpers");

async function recoverPwd(req,res,next){
    let connection
    try{
        connection = await getConnection();

        const {email} = req.body

        let user;
        try{
            [user] = await connection.query(`
            SELECT *
            FROM users
            WHERE email=?
            `,[email]);

        }catch(error){
            throw new Error ("No se ha podido buscar ningun usuario con ese email")
        }

        if(user[0].length < 1) throw new Error ("No se ha encontrado ningun usuario con ese email");

        //generamos un codigo de recuperacion
        const code = crypto.randomBytes(20).toString("hex").slice(0,20);
        //introducimos el codigo en la bbdd
        try{
            await connection.query(`
            UPDATE users
            SET activationCode=?
            WHERE email=?
            `,[code,email]);
        }catch(error){
            throw new Error ("No se ha podido actualizar el codigo de recuperacion")
        }

        //enviar correo de recuperacion
        //creamos un link de recuperacion
        const recoverLink = `${process.env.DOMINIO}/reset/${code}`;
        await sendMail({
            to:email,
            subject:"Recuperacion de contraseña",
            message: `Hola, has solicitado recuperar tu contraseña 
            Para resetear tu contraseña haz click en el siguiente enlace
            ${recoverLink}`
        });

        res.send("Correo de recuperacion enviado")
    }catch(error){
        next(error);
    }finally{
        if(connection)connection.release();
    }
}

module.exports = {recoverPwd};