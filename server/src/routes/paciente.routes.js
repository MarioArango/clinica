const { Router } = require('express');

const { listar_pacientes, buscar_paciente, agregar_paciente, actualizar_paciente, eliminar_paciente} = require("../controllers/pacienteController");

const router = Router();

router.get("/listar-pacientes", listar_pacientes);
router.post("/buscar-paciente", buscar_paciente);
router.post("/agregar-paciente", agregar_paciente);
router.put("/actualizar-paciente", actualizar_paciente);
router.delete("/eliminar-paciente/:_id_persona", eliminar_paciente);

module.exports = router;