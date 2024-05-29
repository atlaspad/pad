/*  backend/routes/project.route.js
 *	2024 © Atlaspad Launchpad
 *  Yigid BALABAN <fyb@fybx.dev>
 */

const express = require('express');
const router = express.Router();

require('../controllers/project.controller')();

router.route('/:projectId').get(getProject);

module.exports = router;
