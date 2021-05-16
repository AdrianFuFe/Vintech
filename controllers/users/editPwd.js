const {getConnection} = require("../../db");
const bcrypt = require("bcrypt");

async function changePwd(req, res, next) {
    let connection;

    try{
        connection = await getConnection();

        const {oldPwd, newPwd, newPwdConfirm} = req.body;
        const {id} = req.params;

        //comparamos la nueva pwd con la confirmacion
        if(newPwd !== newPwdConfirm) throw new Error ("La nueva contraseña no coincide")
        
        //comparamos con la bbdd la pwd codificada
        let existingUser;
        try{
            [existingUser] = await connection.query(`
            SELECT *
            FROM users
            WHERE id=?
            `,[id]);
        }catch(error){
            throw new Error("No se ha podido buscar al usuario en la bbdd");
        }
        
        //obtenemos la pwd codificada de la bbdd
        const pwdCoded = existingUser[0].pwd;
        
        //comparamos la contraseña con la de la bbdd
        try{
            const isValid = await bcrypt.compare(oldPwd, pwdCoded);
            if(isValid === false) throw new Error ("La contraseña introducida no coincide")
        }catch(error){
            throw new Error ("No se ha podido comparar la contraseña")
        }
        
        //codificamos la pwd antigua para compararla con la bbdd
        let pwdDb;
        try{
            pwdDb = await bcrypt.hash(oldPwd, 10);
        }catch(error){
            throw new Error("No se ha podido codificar la contraseña");
        }

        //introducimos la pwd codificada en la bbdd
        try{
            await connection.query(`
                UPDATE users
                SET pwd=?
                WHERE id=?
            `,[pwdDb,id]);
        }catch(error){
            throw new Error ("La contraseña no se ha podido actualizar");
        }
        
        res.send("La contraseña ha sido actualizada correctamente");

    }catch(error){
        next(error);
    }finally{
        if(connection)connection.release();
    }
}
module.exports = {changePwd};