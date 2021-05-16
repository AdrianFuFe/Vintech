const { getConnection } = require("../../db");
const { sendMail } = require("../../helpers");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


async function createUser(req, res, next){
    let connection;
    try{
        connection = await getConnection();

        //obtener datos de request
        const {username, email, pwd}= req.body;

        //comprobar datos request existen
        if(!username){
            throw new Error("Falta introducir el username");
        }else if(!email){
            throw new Error("Faltan introducir el email");
        }else if (!pwd){
            throw new Error("Faltan introducir contraseña");
        }

        //comprobar si usuario ya existe
        let user
        try{
            [user] = await connection.query(`
                SELECT *
                FROM users
                WHERE email=?
            `,
            [email])
        }catch(error){
            next(error)
        }
        if(user.length>0){
            throw new Error ("Ya existe un usuario con ese email")
        }


        //codificamos password
        let pwdDb = await bcrypt.hash(pwd,10);

        //crear codigo de registro para activacion
        const activationCode = crypto.randomBytes(20).toString("hex").slice(0,20)

        //introducir datos en db
        try{
            await connection.query(`
            INSERT INTO users(
                username,
                email,
                pwd,
                creation_date,
                activationCode
                )VALUES(
                    "${username}",
                    "${email}",
                    "${pwdDb}",
                    UTC_TIMESTAMP,
                    "${activationCode}"
                )
            `)
        }catch(error){
            next(error)
        }


        //enviamos email de confirmacion
        const validationLink = `${process.env.DOMINIO}/activation/${activationCode}`;
        await sendMail({ 
            to: email,
            subject: "Registro Vintech Place",
            message: 
            `Gracias por registrate en Vintage Place
            Activa tu cuenta haciendo click en el siguiente enlace 
            ${validationLink}`
        })

        res.send ('usuario creado correctamente');

    }catch(error){
        next(error);
    }finally{
        if(connection) connection.release; 
    }
}

module.exports = {createUser};