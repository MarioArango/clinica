const mysql = require("../database");

const  medicoController = {

    listar_medicos: (req, res) => {

        const sql = "call SP_GET_ListarMedicos()";

        mysql.query(sql, [], (error, data) => {
            if(!error){
                if (data.length != 0) {
                    res.status(200).send({status: "Success", data: data[0], code: 200});
                } else {
                    res.status(400).send({status: "Success", message: "No hay medicos registrados", code: 400});
                }
            }else {
                res.status(400).send({ status: "Error", message: error, code: 400 });
            }
        });
    },
    buscar_medico: (req, res) => {

        const { _dni } = req.body;
        const sql2 = "call SP_POST_PersonaRegistrada(?)";
        const sql = "call  SP_POST_BuscarMedicoDNI(?)";

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
                    res.status(400).send({ status: "Error", message: "Medico no registrado", code: 400 });
                }
            }else {
                res.status(400).send({ status: "Error", message: "Error de conexion", code: 400 });
            }
        })
    },
    agregar_medico: (req, res) => {
        const { _nombre, _apellido_paterno, _apellido_materno, _edad, _dni, _fecha_ingreso, _especialidad } = req.body;

        const sql2 = "call SP_POST_PersonaRegistrada(?)";
        const sql = "call SP_POST_AgregarMedico(?,?,?,?,?,?,?)";

        mysql.query(sql2, [_dni], (er, dt) => {
             if (!er) {
                if (dt[0].length == 0) {

                    mysql.query(sql, [_nombre, _apellido_paterno, _apellido_materno, _edad, _dni, _fecha_ingreso, _especialidad], (error, data) => {
                        if(!error){
                            res.status(200).send({ status: "Success", message: "Medico registrado", code: 200 });
                        }else {
                            res.status(400).send({ status: "Error", message: "Error de conexion", code: 400 });
                        }
                    });

                } else {
                    res.status(400).send({ status: "Error", message: "Medico existente", code: 400 });
                }
            }else {
                res.status(400).send({ status: "Error", message: "Error de conexion", code: 400 });
            }
        })    
    },

    actualizar_medico: (req, res) => {

        const { _id_medico, _id_persona, _nombre, _apellido_paterno, _apellido_materno, _edad, _dni, _especialidad } = req.body;

        const sql = "call SP_PUT_ActualizarMedico(?,?,?,?,?,?,?,?)";
        mysql.query(sql, [_id_medico, _id_persona, _nombre, _apellido_paterno, _apellido_materno, _edad, _dni, _especialidad], (error, data) => {
            if(!error){
                res.status(200).send({ status: "Success", message: "Médico actualizado", code: 200 });
            }else {
                res.status(400).send({ status: "Error", message: error, code: 400 });
            }
        })
    },

    eliminar_medico: (req, res) => {

        const { _id_persona } = req.params;

        const sql = "call SP_DELETE_EliminarMedico(?)";
        mysql.query(sql, [_id_persona], (error, data) => {
            if(!error){
                res.status(200).send({ status: "Success", message: "Médico eliminado", code: 200 });
            }else {
                res.status(400).send({ status: "Error", message: error, code: 400 });
            }
        })
    }

};



module.exports = medicoController;