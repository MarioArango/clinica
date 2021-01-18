const { Router } = require('express');

const { listar_medicos, buscar_medico, agregar_medico, actualizar_medico, eliminar_medico} = require("../controllers/medicoController");

const router = Router();

router.get("/listar-medicos", listar_medicos);
router.post("/buscar-medico", buscar_medico);
router.post("/agregar-medico", agregar_medico);
router.put("/actualizar-medico", actualizar_medico);
router.delete("/eliminar-medico/:_id_persona", eliminar_medico);


module.exports = router;

