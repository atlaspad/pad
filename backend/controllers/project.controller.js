/*  backend/controllers/project.controller.js
 *	2024 © Atlaspad Launchpad
 *  Yigid BALABAN <fyb@fybx.dev>
 */

const ProjectServiceClass = require('../services/project.service');

module.exports = function () {
	const ProjectService = new ProjectServiceClass();

	this.createProject = async (req, res, next) => {
		try {
			const newProject = await ProjectService.createProject(req.body);
			return res.status(201).json({ success: true, data: { newProject } });
		} catch (err) {
			next(err);
		}
	};

	this.getProject = async (req, res) => {
		const project = await ProjectService.getProject(req.params.projectId);
		if (project) return res.status(200).json({ success: true, data: { project } });
		else
			return res
				.status(404)
				.json({ success: false, message: `Project not found: '${req.params.projectId}'` });
	};

	this.getProjects = async (req, res) => {
		const projects = await ProjectService.getProjects();
		return res.status(200).json({ success: true, data: { projects } });
	};

	this.deleteProject = async (req, res) => {
		const deletedProject = await ProjectService.deleteProject(req.params.projectId);
		return res.status(200).json({ success: true, data: { deletedProject } });
	};
};
