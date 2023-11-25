/*Importando la libreria de express para activar la comunicación protocolo HTTP 
   ECMS6 */

   import express from 'express';
   import generalRoutes from './routes/generalRoutes.js';
   import userRoutes from './routes/userRoutes.js';
   import db from './config/db.js';
   import User from './models/User.js';
   import Seller from './models/Seller.js';
   import helmet from 'helmet';
   import dotenv from 'dotenv';
   import cookieParser from 'cookie-parser';
   import { homePage } from './controllers/userController.js';
   dotenv.config({path:"src/.env"})
   // Crear la app
   const app  = express()
   
   //Abilitar el uso de  cookies
   
   
   const port = 3000;
   try {
       //Con este comando me logeo a la base de datos
       await db.authenticate();
       await db.sync();/*Crear las tablas o crear la conexión con las bases de datos */
       console.log("Conexión ala base de datos exítosa");
   } catch (error) {
       console.log("error");
       
   }
   
   app.set('view engine','pug')//Le dice al Servidor que lo que se va a agtregar y a utilizar en este caso es PUG.
   app.set('views','./src/views')//Estamos definiendo en donde estarán las vistas.
   
   app.use(helmet())
   
   //Carpeta Pública.
   app.use(express.static('public'))
   //Permitimos la lectura de datos a traves de los elementos HTML.
   app.use(express.urlencoded({extended:true}))

   app.use(cookieParser());

   
   app.listen(port,(request,response) => {
       // Imprimir un mensaje en la consola indicando el puerto en el que está funcionando el servidor
       //Le indicamos a la instancia de express que comience a escuchar las peticiones
       console.log(`El servicio HTTP A iniciado.... \nEl servidor está funcionando en el puerto ${port}`);
   });   
   app.use('/login',userRoutes)
   app.use(express.static('./src/public'))
   app.use('/',generalRoutes)
   app.use('/home',homePage);
   
   