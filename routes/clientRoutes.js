const { Router } = require('express');

const { showHomePage, show404 } = require('../controllers/userControllers');

const router = Router();

//Routes
router.get("/", showHomePage);

router.get('/404', show404)

module.exports = router;