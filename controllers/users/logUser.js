const {getConnection} = require("../../db");
const bcrypt = require ("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

async function logUser(req,res,next){
    let connection
    try{
        connection = await getConnection();
        
        //obtenemos datos de la peticion
        const {email,pwd} = req.body;
        //comprobamos que no falten datos
        if(!email || !pwd){
            throw new Error ("Faltan datos de acceso")
        }
        
        let user;
        //obtener datos de usuario
        try{
            [user] = await connection.query(`
            SELECT *
            FROM users
            WHERE email=?
            `,[email])
        }catch(error){
            throw new Error ("No se ha podido obtener los datos de usuario")
        }
        //si no hay usuarios con ese email nos devuelve un error
        if(user.length < 1){
            throw new Error("No existe un usuario con ese email")
        }

        //comparamos la contraseña
        const passwordDb = user[0].pwd
        try{
            const isValid = await bcrypt.compare(pwd,passwordDb);
            if(isValid === false){
                throw new Error ("La contraseña no coincide");
            }
        }catch(error){
            throw new Error ("No se puede comparar la contraseña");
        }

        //creamos token
        const tokenInfo = {
            id: user[0].id
        }
        const token = jsonwebtoken.sign(tokenInfo,process.env.SECRET)

        res.send(token)

    }catch(error){
        next(error)
    }finally{
        if(connection) connection.release();
    }
}

module.exports = {logUser}