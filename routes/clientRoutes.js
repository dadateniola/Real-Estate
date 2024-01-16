const { Router } = require('express');

const { showSignPage, show404, showHomePage } = require('../controllers/userControllers');

const router = Router();

//Routes
router.get("/", showSignPage);

router.get("/home", showHomePage);

router.get('/404', show404);

module.exports = router;