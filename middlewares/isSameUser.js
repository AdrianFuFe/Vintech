const jsonwebtoken = require("jsonwebtoken");

async function isSameUser (req,res,next){

    const {id}=req.params

    try{
        const {authorization} = req.headers;
        //error si no existe cabecera de autorizacion
        if (!authorization) throw new Error ("La peticion debe incluir un token");

        //comprobar que el token es valido
        let tokenInfo;
        try{
            tokenInfo = jsonwebtoken.verify(authorization, process.env.SECRET)
        }catch(error){
            throw new Error ("El token no se pudo verificar")
        }

        req.auth = tokenInfo
        
        //comprobamos 
        if(req.auth.id !== parseInt(id)){
            throw new Error("Los ids no coinciden")
        }

        next();
    }catch(error){
        next(error)
    }
}

module.exports = {isSameUser};