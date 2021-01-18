if(process.env.NODE_ENV === 'development'){
  require('dotenv').config();
  var morgan = require('morgan');
}

const express = require("express");
const cors = require("cors");

const pacienteRoutes = require("./routes/paciente.routes");
const medicoRoutes = require("./routes/medico.routes");
const citaRoutes = require("./routes/cita.routes");

const app = express();

//MIDDLEWARES
app.use(cors({ exposedHeaders: ["auth-token"] }));

/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
  res.header("Allow", "GET,POST,OPTIONS,PUT,DELETE");
  next();
});
*/

/*app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});*/


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method,');
  res.header('content-type: application/json; charset=utf-8')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next()
})



if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//SETTINGS
app.set("port", process.env.PORT || 7789);


//ROUTES
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/medicos", medicoRoutes);
app.use("/api/citas", citaRoutes);

//INITIALIZATION
const init = () => {
  app.listen(app.get("port"), () => {
  console.log(`Conectado al servidor en el puerto ${app.get("port")}`);
  });
}

init()