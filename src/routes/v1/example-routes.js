const express = require('express');

const { ExampleController } = require('../../controllers');
const { ExampleMiddleware } = require('../../middleware');

const router = express.Router();

// /api/v1/examples POST
router.post('/', ExampleMiddleware.validateCreateExample, ExampleController.createExample);

// /api/v1/examples GET
router.get('/', ExampleController.getAllExamples);

// /api/v1/examples/:id GET
router.get('/:id', ExampleController.getExample);

// /api/v1/examples/:id PATCH
router.patch('/:id', ExampleMiddleware.validateUpdateExample, ExampleController.updateExample);

// /api/v1/examples/:id DELETE
router.delete('/:id', ExampleController.deleteExample);

module.exports = router;
