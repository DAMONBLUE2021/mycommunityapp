const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const auth = require('../middleware/auth');

router.get('/', auth, serviceController.getAllServices);
router.post('/:serviceId/volunteer', auth, serviceController.volunteerForService);

module.exports = router;
