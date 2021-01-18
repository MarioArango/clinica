const mysql = require("../database");

const  pacienteController = {

    listar_pacientes: (req, res) => {

        const sql = "call SP_GET_ListarPacientes()";

        mysql.query(sql, [], (error, data) => {
            if(!error){
                if (data.length != 0) {
                    res.status(200).send({status: "Success", data: data[0], code: 200});
                } else {
                    res.status(400).send({status: "Success", message: "No hay pacientes registrados", code: 400});
                }
            }else {
                res.status(400).send({ status: "Error", message: error, code: 400 });
            }
        });
    },

    buscar_paciente: (req, res) => {

        const { _dni } = req.body;
        const sql2 = "call SP_POST_PersonaRegistrada(?)";
        const sql = "call  SP_POST_BuscarPacienteDNI(?)";

        mysql.query(sql2, [_dni], (err, dat) => {
            if(!err){
                if(dat.length != 0){
                    mysql.query(sql, [_dni], (error, data) => {
                        if (!error) {
                            res.status(200).send({ status: "Success", data: data[0], code: 200 });
                        } else {
                            res.status(400).send({ status: "Error", message: "Error de conexion", code: 400 });
                        }
                    });
                }else {
                    res.status(400).send({ status: "Error", message: "Paciente no registrado", code: 400 });
                }
            }else {
                res.status(400).send({ status: "Error", message: "Error de conexion", code: 400 });
            }
        })
    },
    agregar_paciente: (req, res) => {
        const { _nombre, _apellido_paterno, _apellido_materno, _edad, _dni, _telefono } = req.body;

        const sql2 = "call SP_POST_PersonaRegistrada(?)";
        const sql = "call SP_POST_AgregarPaciente(?,?,?,?,?,?)";

        mysql.query(sql2, [_dni], (er, dt) => {
             if (!er) {
                if (dt[0].length == 0) {
                    mysql.query(sql, [_nombre, _apellido_paterno, _apellido_materno, _edad, _dni, _telefono], (error, data) => {
                        if(!error){
                            res.status(200).send({ status: "Success", message: "Registrado", code: 200 });
                        }else {
                            res.status(400).send({ status: "Error", message: "Error de conexion", code: 400 });
                        }
                    })
                } else {
                    res.status(400).send({ status: "Error", message: "Paciente existente", code: 400 });
                }
            }else {
                res.status(400).send({ status: "Error", message: "Error de conexion", code: 400 });
            }
        })
        
    },

    actualizar_paciente: (req, res) => {

        const { _id_paciente, _id_persona, _nombre, _apellido_paterno, _apellido_materno, _edad, _dni, _telefono } = req.body;

        const sql = "call SP_PUT_ActualizarPaciente(?,?,?,?,?,?,?,?)";
        mysql.query(sql, [_id_paciente, _id_persona, _nombre, _apellido_paterno, _apellido_materno, _edad, _dni, _telefono], (error, data) => {
            if(!error){
                res.status(200).send({ status: "Success", message: "Paciente actualizado", code: 200 });
            }else {
                res.status(400).send({ status: "Error", message: error, code: 400 });
            }
        })
    },

    eliminar_paciente: (req, res) => {

        const { _id_persona } = req.params;

        const sql = "call SP_DELETE_EliminarPaciente(?)";
        mysql.query(sql, [_id_persona], (error, data) => {
            if(!error){
                res.status(200).send({ status: "Success", message: "Paciente eliminado", code: 200 });
            }else {
                res.status(400).send({ status: "Error", message: error, code: 400 });
            }
        })
    }
};




module.exports = pacienteController;