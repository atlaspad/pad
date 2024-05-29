/*  backend/controllers/project.controller.js
 *	2024 © Atlaspad Launchpad
 *  Yigid BALABAN <fyb@fybx.dev>
 */

const ProjectServiceClass = require('../services/project.service');

module.exports = function () {
	const ProjectService = new ProjectServiceClass();

	this.getProject = async (req, res) => {
		const project = await ProjectService.getProject(req.params.projectId);

		return res.status(200).json({ success: true, data: { project } });
	};
};
