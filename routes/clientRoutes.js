const { Router } = require('express');

const { showSignPage, show404 } = require('../controllers/userControllers');

const router = Router();

//Routes
router.get("/", showSignPage);

router.get('/404', show404)

module.exports = router;