const { Router } = require('express');

const { listar_citas } = require("../controllers/citaController");

const router = Router();

router.get("/listar-citas", listar_citas);

module.exports = router;