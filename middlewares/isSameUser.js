require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");
const {getConnection} = require("../db");

async function isSameUser (req,res,next){
    let connection;
    const {id}=req.params

    try{
        connection = await getConnection();

        const {authorization} = req.headers;
        //error si no existe cabecera de autorizacion
        if (!authorization) throw new Error ("La peticion debe incluir un token");

        //comprobamos que el token es valido y decodificamos
        let tokenInfo;
        try{
            tokenInfo = jsonwebtoken.verify(authorization, process.env.SECRET)
        }catch(error){
            throw new Error ("El token no se pudo verificar")
        }

        //introducimos en la peticion la info del token
        req.auth = tokenInfo

        //comprobamos que el usuario exista
        let user
        try{
            [user]=await connection.query(`
            SELECT *
            FROM users
            WHERE id=?
            `,[id]);

        }catch(error){
            throw new Error ("No se ha podido consultar el usuario en la base de datos")
        }
        if (user.length < 1) throw new Error ("El usuario indicado no existe")
        
        //comprobamos que el id coincida
        if(req.auth.id !== parseInt(id)){
            throw new Error("Los ids no coinciden")
        }

        next();
    }catch(error){
        next(error)
    }
}

module.exports = {isSameUser};