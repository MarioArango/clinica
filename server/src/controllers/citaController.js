const mysql = require("../database");

const citaController = {
    listar_citas: (req, res) => {

        const sql = "call SP_GET_ListarCitas()";

        mysql.query(sql, [], (error, data) => {
            if(!error){
                if (data.length != 0) {
                    res.status(200).send({status: "Success", data: data[0], code: 200});
                } else {
                    res.status(400).send({status: "Success", message: "No hay pacientes registrados", code: 400});
                }
            }else {
                res.status(400).send({ status: "Error", message: "Error de conexion", code: 400 });
            }
        });
    }
}

module.exports = citaController;