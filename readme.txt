# VINTECH PLACE

Proyecto sobre web de compra-venta de productos con temática de tecnología retro.

Los usuarios no registrados solo pueden ver los productos del catálogo y su información.
Los usuarios registrados pueden editar su perfil,
	 subir los productos que quieran vender y editar la información de estos,
	 realizar reservas de los productos que otros usuarios venden,
	 aceptar, y establecer una fecha, hora y lugar para la transacción; 
	 o rechazar las reservas que reciben de otros usuarios,
	 También podrán hablar con otros usuarios sobre algún producto concreto.



------------------------------ FRONTEND ---------------------------------------------------------------------------------

NOTA IMPORTANTE: el frontend hace llamadas a la API en el puerto 3300. Por favor, configurar este puerto en el .env del backend (PORT)

## REQUERIMIENTOS

Para el desarrollo del proyecto hemos utilizado:
    -Git
    -Visual Studio Code
    -Navegador Chrome
    -React (y algunas dependencias como material-ui administradas con npm)

---

## INSTALACION

git clone https://github.com/anxogcd/vintech-place.git  --> clonar repositorio
cd PROJECT_TITLE_DIRECTORY  --> movernos al directorio del proyecto
cd frontend  --> movernos al directorio de frontend
- ejecutar en consola:
    npm install --> instala las dependencias y crea la carpeta node_modules

---

## EJECUCIÓN

- ejecutar en consola:
    npm start --> inicia la app en el navegador




	 
------------------------------  BACKEND ----------------------------------------------------------------------------------

## REQUIRIMIENTOS

Para el desarrollo del proyecto hemos utilizado:
	-Git
	-Visual Studio Code 
	-Postman
	-MySQL Workbench
	-Node.js (y algunas dependencias de Node.js administradas con npm)


---

## INSTALACION

git clone https://github.com/anxogcd/vintech-place.git  --> clonar repositorio
cd PROJECT_TITLE_DIRECTORY  --> movernos al directorio del proyecto
cd backend  --> movernos al directorio de backend
npm init --> instalar dependencias de proyecto

Crear usuario en Sendgrid, configurar un email y obtener una Apikey del servicio.


---

## CONFIGURACION

-crear nuestra conexion en el sistema de gestión de base de datos (SGBD)	 

-configurar "env.example" como ".env"
	PORT = (nº del puerto el el que queramos alojar nuestro servidor local /ej: 3000)
	MYSQL_HOST = (nombre de la ruta creada en nuestro SGBD /ej: localhost) 
	MYSQL_USER = (nombre de usuario creado en nuestro SGBD /ej: root) 
	MYSQL_PASSWORD = (contraseña de usuario para nuestro SGBD /ej: 123456)
	MYSQL_DATABASE = (nombre de nuestra base de datos /ej: vintechDB)
	APIKEY = (clave proporcionada por SENDGRID para utilizar su API)
	SEND_FROM = (email configurado en SENDGRID para el envio de emails)
	DOMINIO = (ruta en la que ejecutamos nuestro servidor de back /ej: http://localhost:3000) 
	DOMINIO_FRONT = (ruta en la que ejecutamos nuestro servidor de front /ej: http://localhost:3300)
	SECRET = (clave que proporcionamos a OOOOOOO para realizar encriptado y desencriptado /ej:claveInventada1234) 
	UPLOADS_DIR = (ruta para la carpeta donde guardaremos las imagenes /ej: static/uploads)
	MAX_ENTRY_IMGS = (número máximo de imágenes de producto /ej: 10)



-ejecutar en consola
	node initdb.js  -->  crear la base de datos
	npm run dev --> iniciar servidor utilizando nodemon a través de npm
    npm start --> iniciar servior
	


---

## CONTROLADORES 		
	
--------------------------------------------USUARIO--------------------------------------------

//CREAR USUARIO
app.post("/user", createUser);
	-METODO: POST
	-URL: apiUrl/user
	-ENDPOINT: createUser
	-REQ: 
		-body: username, email, pwd
	-RES: registra al nuevo usuario y envia email de activacion de la cuenta
	

//ACTIVAR USUARIO
app.get("/activation/:activationCode", activateUser);
	-metodo: GET
	-URL: apiUrl/activation/:activationCode
	-ENDPOINT: activateUser
	-REQ: 
		-params: activationCode
	-RES:	cambia estado de usuario a activo
	
	
//LOGIN USUARIO
app.get("/login", logUser);
	-metodo: GET
	-URL: apiUrl/login
	-ENDPOINT: logUser
	-REQ: 
		-body: email, pwd
	-RES: devuelve el token de usuario
	

//OBTENER INFORMACIÓN DE USUARIO
//OTRO USUARIO
app.get("/user/:id", validAuth, getUser);
	-metodo: GET
	-URL: apiUrl/user/:id
	-MIDDLEWARES: validAuth
	-ENDPOINT: getUser
	-REQ: 
		-header: req.auth.id
		-params: id
	-RES: muestra la informacion del usuario

//MI USUARIO
app.get("/user/:id/myProfile", validAuth, isSameUser, getMyUser);
	-metodo: GET
	-URL: apiUrl/user/:id/myProfile
	-MIDDLEWARES: validAuth, isSameUser
	-ENDPOINT: getMyUser
	-REQ:
		-header: req.auth.id
		-params: id
	-RES: muestra la información del usuario y sus productos a la venta
	

//EDITAR USUARIO
app.put("/user/:id", validAuth, isSameUser, editUser);
	-metodo: PUT
	-URL: apiUrl/user/:id
	-MIDDLEWARES: validAuth, isSameUser
	-ENDPOINT: editUser
	-REQ: 
		-header: req.auth.id
		-params: id
		-body: username, fname, lname, email, bio, last_ubication
	-RES: actualiza los datos de perfil del usuario
	

//BORRAR USUARIO
app.delete("/user/:id", validAuth, isSameUser, deleteUser);
	-metodo: DELETE
	-URL: apiUrl/user/:id
	-MIDDLEWARES: validAuth, isSameUser
	-ENDPOINT: deleteUser
	-REQ: 
		-header: req.auth.id
		-params: id
	-RES: elimina el perfil del usuario
	
	
//RECOVER PASSWORD
app.put("/recoverPwd", recoverPwd);
	-metodo: PUT
	-URL: apiUrl/recoverPwd
	-ENDPOINT: recoverPwd
	-REQ: 
		-body: email
	-RES: envia email de recuperacion de contraseña
	
	
//RESET PASSWORD
app.put("/reset/:code", resetPwd);
	-metodo: PUT
	-URL: apiUrl/reset/:code
	-ENDPOINT: resetPwd
	-REQ: 
		-params: code
		-body:	pwd, confirmPwd
	-RES:	establece una nueva contraseña
	
	
//EDITAR PASSWORD
app.put("/user/:id/changePwd", validAuth, isSameUser, changePwd);
	-metodo: PUT
	-URL: apiUrl/user/:id/changePwd
	-MIDDLEWARES: validAuth, isSameUser
	-ENDPOINT: changePwd
	-REQ: 
		-header: req.auth.id
		-params: id
		-body: oldPwd, newPwd, newPwdConfirm
	-RES: establece una nueva contraseña
	
	
	

--------------------------------------------PRODUCTO--------------------------------------------


//CREAR PRODUCTO
app.post("/product", validAuth, newProduct);
	-metodo: POST
	-URL: apiUrl/product
	-MIDDLEWARES: validAuth
	-ENDPOINT: newProduct
	-REQ: 
		-header: req.auth.id
		-body: title, price, description, ubication, category
	-RES: crea un nuevo producto
	
	
//OBTENER PRODUCTO
app.get("/product/:id", getProduct);
	-metodo: GET
	-URL: apiUrl/product/:id
	-ENDPOINT: getProduct
	-REQ: 
		-params: id
	-RES: muestra la informacion del producto
	
	
//BUSCAR PRODUCTOS
app.get("/product", listProducts);
	-metodo: GET
	-URL: apiUrl/product?search=
	_-ENDPOINT: listProducts
	-REQ: 
		-params: search
	-RES: nos muestra los productos aplicando los filtros que le indicamos
	
	
//EDITAR PRODUCTO
app.put("/product/:id", validAuth, canEdit, editProduct);
	-metodo: PUT
	-URL: apiUrl/product/:id
	-MIDDLEWARES: validAuth, canEdit
	-ENDPOINT: editProduct
	-REQ: 
		-header: req.auth.id
		-params: id
		-body: title, price, description, ubication
	-RES: cambia la informacion del producto
	
	
//BORRAR PRODUCTO
app.delete("/product/:id", validAuth, canEdit, deleteProduct);
	-metodo: DELETE
	-URL: apiUrl/product/:id
	-MIDDLEWARES: validAuth, canEdit
	-ENDPOINT: deleteProduct
	-REQ: 
		-header: req.auth.id
		-params: id
	-RES: elimina el producto
	
	
//AÑADIR FOTO DE PRODUCTO
app.post("/product/:id/images", validAuth, canEdit, addImgProduct);
	-metodo: POST
	-URL: apiUrl/product/:id/images
	-MIDDLEWARES: validAuth, canEdit
	_ENDPOINT: addImgProduct
	-REQ: 
		-header: req.auth.id
		-params: id
		-files: images
	-RES: añade imagenes a la informacion de un producto
	
	
//BORRAR FOTO DE PRODUCTO
app.delete("/product/:id/images/:imgId", validAuth, canEdit, deleteImgProduct);
	-metodo: DELETE
	-URL: apiUrl/product/:id/images/:imgId
	-MIDDLEWARES: validAuth, canEdit
	-ENDPOINT: deleteImgProduct
	-REQ: 
		-header: req.auth.id
		-params: id, imgId
	-RES: elimina una imagen de la informacion de un producto
	
//OBTENER PRODUCTOS DE UN USUARIO CONCRETO
app.get("/user/:id/products", getUserProducts);
	-metodo: GET
	-URL: apiUrl/user/:id/products
	-MIDDLEWARES: none
	-ENDPOINT getUserProducts
	-REQ:
		-params: id

//MARCAR PRODUCTO COMO VENDIDO
app.put("/product/:id/sell", validAuth, sellProduct);
	-metodo: PUT
	-URL: apiUrl/product/:id/sell
	-MIDDLEWARES: validAuth
	-ENDPOINT: sellProduct
	-REQ:
		-header: req.auth.id
		-params: sellProduct

//OBTENER HISTORIAL DE PRODUCTOS DE USUARIO
app.get("/user/:id/history", validAuth, isSameUser, historyProducts);
	-metodo: GET
	-URL: apiUrl/user/:id/history
	-MIDDLEWARES: validAuth, isSameUser
	-ENDPOINT: historyProducts
	-REQ:
		-header: req.auth.id
		-params: id

	
	
	
--------------------------------------------MENSAJES--------------------------------------------


//ENVIAR MENSAJE
app.post("/product/:id/messages/:userId", validAuth, sendMessage);
	-METODO: POST
	-URL: apiUrl/product/:id/messages/:userId
	-MIDDLEWARES: validAuth
	-ENDPOINT: sendMessage
	-REQ: 
		-header: req.auth.id
		-params: id, userId
		-body: text
	-RES: envia mensaje a otro usuario
	

//LISTAR CONVERSACIONES
app.get("/user/:id/messages", validAuth, isSameUser, listConversations);
	-METODO: GET
	-URL: apiUrl/user/:id/messages
	-MIDDLEWARES: validAuth, isSameUser
	-ENDPOINT: listConversations
	-REQ: 
		-header: req.auth.id
		-params: id
	-RES: muestra las conversaciones de un usuario
	

//LISTAR MENSAJES
app.get("/product/:id/messages/:userId", validAuth, listMessages);	
	-METODO: GET
	-URL: apiUrl/product/:id/messages/:userId
	-MIDDLEWARES: validAuth
	-ENDPOINT: listMessages
	-REQ: 
		-header: req.auth.id
		-params: :id:userId
	-RES: muestra los mensajes de una conversacion 
	






--------------------------------------------RESERVAS--------------------------------------------


//CREAR RESERVA
app.post("/product/:idProduct", validAuth, newBooking);
	-METODO: POST
	-URL: apiUrl/product/:idProduct
	-MIDDLEWARES: validAuth
	-ENDPOINT: newBooking
	-REQ: 
		-header: req.auth.id
		-params: :idProduct
	-RES: crea una reserva para un producto
	

//VER LISTA RESERVAS RECIBIDA
app.get("/user/:id/bookings-in", validAuth, isSameUser, listBookingsIn);
	-METODO: GET
	-URL: apiUrl/user/:id/bookings-in
	-MIDDLEWARES: validAuth, isSameUser
	-ENDPOINT: listBookingsIn
	-REQ: 
		-header: req.auth.id
		-params: id
	-RES: muestra las reservas recibidas de un usuario
	

//VER LISTA RESERVAS REALIZADAS
app.get("/user/:id/bookings-out", validAuth, isSameUser, listBookingsOut);
	-METODO: GET
	-URL: apiUrl/user/:id/bookings-out
	-MIDDLEWARES: validAuth, isSameUser
	-ENDPOINT: listBookingsOut
	-REQ: 
		-header: req.auth.id
		-params: id
	-RES: muestra las reservas realizadas por un usuario
	

//VER UNA RESERVA
app.get("/user/:id/bookings/:idBooking", validAuth, isSameUser, getBooking);
	-METODO: GET
	-URL: apiUrl/user/:id/bookings/:idBooking
	-MIDDLEWARES: validAuth, isSameUser
	-ENDPOINT: getBooking
	-REQ: 
		-header: req.auth.id
		-params: id, idbooking
	-RES: muestra información de una reserva concreta
	

//CANCELAR UNA RESERVA REALIZADA
app.delete("/user/:id/bookings-out/:idProduct/cancel", validAuth, isSameUser, cancelBookingOut);
	-METODO: DELETE
	-URL: apiUrl/user/:id/bookings-out/:idProduct/cancel
	-MIDDLEWARES: validAuth, isSameUser
	-ENDPOINT: cancelBookingOut
	-REQ: 
		-header: req.auth.id
		-params: id, idProduct
	-RES: cancela y elimina una reserva realizada
	

//RESPONDER UNA RESERVA RECIBIDA
app.get("/user/:id/bookings/:idBooking/:response", validAuth, isSameUser, responseBooking);
	-METODO: GET
	-URL: apiUrl/user/:id/bookings/:idBooking/:response
	-MIDDLEWARES: validAuth, isSameUser
	-ENDPOINT: acceptBooking
	-REQ: 
		-header: req.auth.id
		-params: id, idProduct, response
		-body: meetDate, ubication
	-RES: da una respuesta a la reserva recibida.
		-Accept: establece fecha, hora y lugar para la transacción del producto,
			bloqueando además la posibilidad de otras reservas del producto.
		-Reject: devuelve una respuesta negativa a la reserva.
	
	
	


--------------------------------------------VOTOS--------------------------------------------


//VOTAR LA TRANSACCION CON UN USUARIO
app.post("/user/:id/votes", validAuth, canVote, sendVote);
	-METODO: POST 
	-URL: apiUrl/user/:id/votes
	-MIDDLEWARES: validAuth, canVote
	-ENDPOINT: sendVote
	-REQ: 
		-header: req.auth.id
		-params: id
		-body: stars, comment
	-RES: crea una valoracion de la transaccion realizada con otro usuario
	
	
//VER VALORACIONES
app.get("/user/:id/votes", listVotes);
	-METODO: GET
	-URL: apiUrl/user/:id/votes
	-ENDPOINT: listVotes
	-REQ: 
		-params: id
	-RES: muestra las valoraciones recibidas por un usuario
	
	
//EDITAR UNA VALORACION
app.put("/vote/:id", validAuth, canEditVote, editVote);
	-METODO: PUT
	-URL: apiUrl/vote/:id
	-MIDDLEWARES: validAuth, canEditVote
	-ENDPOINT: editVote
	-REQ: 
		-header: req.auth.id
		-params: id
		-body: stars, comment
	-RES: edita una valoración realizada sobre la transacción con otro usuario
	

//BORRAR UNA VALORACION
app.delete("/vote/:id", validAuth, canEditVote, deleteVote);
	-METODO: DELETE
	-URL: apiUrl/vote/:id
	-MIDDLEWARES: validAuth, canEditVote
	-ENDPOINT: deleteVote
	-REQ: 
		-header: req.auth.id
		-params: id
	-RES: elimina una valoración realizada sobre una transacción con otro usuario
	
	
	

--------------------------------------------FAVS--------------------------------------------


//AÑADIR UN PRODUCTO A TU LISTA DE FAVORITOS
app.post("/product/:id/fav", validAuth, addFav);
	-METODO: POST
	-URL: apiUrl/product/:id/fav
	-MIDDLEWARES: validAuth
	-ENDPOINT: addFav
	-REQ: 
		-header: req.auth.id
		-params: id
	-RES: añade el producto indicado a tu lista de favoritos
	

//VER LISTA DE FAVORITOS	
app.get("/user/:id/favs", validAuth, isSameUser, listFavs);
	-METODO: GET
	-URL: apiUrl/user/:id/favs
	-MIDDLEWARES: validAuth, isSameUser
	-ENDPOINT: listFavs
	-REQ: 
		-header: req.auth.id
		-params: id
	-RES: muestra los productos añadidos a tu lista de favoritos
	

//ELIMINAR UN PRODUCTO DE TU LISTA DE FAVORITOS	
app.delete("/product/:id/fav", validAuth, deleteFav);
	-METODO: DELETE
	-URL: apiUrl/product/:id/fav
	-MIDDLEWARES: validAuth
	-ENDPOINT: deleteFav
	-REQ: 
		-header: req.auth.id
		-params: id
	-RES: elimina un producto de tu lista de favoritos
	
	
	
	
