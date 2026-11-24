const express = require('express');

const { InfoController } = require('../../controllers');
const exampleRoutes = require('./example-routes');

const router = express.Router();

router.get('/info', InfoController.info);
router.use('/examples', exampleRoutes);

module.exports = router;
