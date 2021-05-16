require("dotenv").config();
const {getConnection} = require ("../../db");
const crypto = require("crypto");
const sendgrid = require("@sendgrid/mail");

async function recPwd(req,res,next){
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
        try{
            //creamos un link de recuperacion
            const recoverLink = `${process.env.DOMINIO}/reset/${code}`;

            sendgrid.setApiKey(process.env.APIKEY);
            const message = {
                to: email,
                from: process.env.SEND_FROM,
                subject: "recuperacion de contraseña",
                html:
                `<div>
                    <h1> Hola, has solicitado recuperar tu contraseña </h1>
                    <p> Para resetear tu contraseña haz click en el siguiente enlace ${recoverLink}</p>
                </div>`
            }
            await sendgrid.send(message);

        }catch(error){
            throw new Error ("No se ha podido enviar el email de recuperacion")
        }


        res.send(code)
    }catch(error){
        next(error);
    }finally{
        if(connection)connection.release();
    }
}

module.exports = {recPwd};